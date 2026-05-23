from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from typing import Optional
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from datetime import datetime
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="Bhasit Gupta Portfolio API",
    description="Backend API for Bhasit Gupta's developer portfolio",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://bhasitgupta.vercel.app",
        "*",  # Restrict in production
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ContactForm(BaseModel):
    name: str
    email: EmailStr
    subject: Optional[str] = "Portfolio Contact"
    message: str


class ContactResponse(BaseModel):
    success: bool
    message: str
    timestamp: str


# In-memory analytics store (use Redis/PostgreSQL in prod)
analytics: dict = {
    "visits": 0,
    "contacts": 0,
    "last_reset": datetime.now().isoformat(),
}


def send_email_notification(contact: ContactForm):
    """Send email notification when someone contacts via portfolio."""
    try:
        smtp_host = os.getenv("SMTP_HOST", "smtp.gmail.com")
        smtp_port = int(os.getenv("SMTP_PORT", "587"))
        smtp_user = os.getenv("SMTP_USER", "")
        smtp_pass = os.getenv("SMTP_PASS", "")
        to_email = os.getenv("PORTFOLIO_EMAIL", smtp_user)

        if not smtp_user or not smtp_pass:
            logger.warning("SMTP credentials not configured — skipping email.")
            return

        msg = MIMEMultipart("alternative")
        msg["Subject"] = f"Portfolio Contact: {contact.subject}"
        msg["From"] = smtp_user
        msg["To"] = to_email
        msg["Reply-To"] = contact.email

        html = f"""
        <html><body style="font-family:Inter,sans-serif;background:#000;color:#fff;padding:20px;">
          <div style="max-width:600px;margin:0 auto;background:#0a0a1e;border:1px solid rgba(0,245,255,0.2);border-radius:12px;padding:24px;">
            <h2 style="color:#00f5ff;font-family:monospace;letter-spacing:4px;margin-bottom:20px;">
              NEW PORTFOLIO MESSAGE
            </h2>
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="color:#888;width:80px;padding:8px 0;">Name:</td>
                  <td style="color:#fff;">{contact.name}</td></tr>
              <tr><td style="color:#888;padding:8px 0;">Email:</td>
                  <td style="color:#00f5ff;">{contact.email}</td></tr>
              <tr><td style="color:#888;padding:8px 0;">Subject:</td>
                  <td style="color:#fff;">{contact.subject}</td></tr>
            </table>
            <div style="margin-top:20px;padding:16px;background:rgba(255,255,255,0.03);border-radius:8px;border-left:2px solid #8b5cf6;">
              <p style="color:#aaa;margin:0;line-height:1.6;">{contact.message}</p>
            </div>
            <p style="color:#444;font-size:12px;margin-top:20px;">
              Sent from Portfolio — {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}
            </p>
          </div>
        </body></html>
        """

        msg.attach(MIMEText(html, "html"))

        with smtplib.SMTP(smtp_host, smtp_port) as server:
            server.starttls()
            server.login(smtp_user, smtp_pass)
            server.sendmail(smtp_user, to_email, msg.as_string())

        logger.info(f"Email sent for contact from {contact.email}")

    except Exception as e:
        logger.error(f"Failed to send email: {e}")


@app.get("/")
def root():
    return {
        "message": "Bhasit Gupta Portfolio API",
        "status": "online",
        "version": "1.0.0",
        "docs": "/docs",
    }


@app.get("/health")
def health():
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}


@app.post("/api/contact", response_model=ContactResponse)
async def contact(form: ContactForm, background_tasks: BackgroundTasks):
    """Handle contact form submissions."""
    if len(form.message) < 10:
        raise HTTPException(status_code=400, detail="Message too short.")
    if len(form.message) > 5000:
        raise HTTPException(status_code=400, detail="Message too long.")

    # Send email in background
    background_tasks.add_task(send_email_notification, form)

    # Update analytics
    analytics["contacts"] += 1

    logger.info(f"Contact from {form.name} <{form.email}>")

    return ContactResponse(
        success=True,
        message="Your message has been received! I'll get back to you soon.",
        timestamp=datetime.now().isoformat(),
    )


@app.get("/api/analytics")
def get_analytics():
    """Get portfolio analytics (visits, contacts)."""
    return analytics


@app.post("/api/analytics/visit")
def record_visit():
    """Record a portfolio visit."""
    analytics["visits"] += 1
    return {"visits": analytics["visits"]}


@app.get("/api/projects")
def get_projects():
    """Return projects data (for dynamic loading)."""
    return {
        "projects": [
            {
                "id": 1,
                "title": "AI Content Generator",
                "category": "AI/ML",
                "status": "live",
                "tech": ["Python", "FastAPI", "React", "OpenAI"],
                "github": "https://github.com/bhasitgupta",
            },
            {
                "id": 2,
                "title": "Neural Style Transfer",
                "category": "AI/ML",
                "status": "live",
                "tech": ["PyTorch", "FastAPI", "React"],
                "github": "https://github.com/bhasitgupta",
            },
        ]
    }
