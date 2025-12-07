import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Config:
    """Base configuration class with simplified database connection."""
    
    # --- General Flask Configuration ---
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'you_will_never_guess_the_secret_key'
    
    # --- Database Configuration (Supabase PostgreSQL) ---
    # DATABASE_URL should contain the full connection string: 
    # e.g., 'postgresql://postgres:[password]@db.xyz.supabase.co:5432/postgres'
    SQLALCHEMY_DATABASE_URI = os.environ.get('SUPABASE_URL') or 'sqlite:///site.db'
    print("database url",SQLALCHEMY_DATABASE_URI)
    # Recommended setting: prevents modification tracking overhead
    SQLALCHEMY_TRACK_MODIFICATIONS=False