# app/routers/__init__.py
# Import specific routers here for easier management
from .audio import router as audio_router

# Expose them if required
__all__ = ["audio_router"]
