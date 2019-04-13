from django.contrib.auth.backends import ModelBackend
from django.db.models import Q

from users.models import User


class CustomBackend(ModelBackend):
    def authenticate(self, username=None, password=None, **kwargs):
        try:
            user = User.objects.get(Q(sno=username) | Q(username=username))
            if user.check_password(password):
                return user
        except Exception as e:
            del e
            return None


