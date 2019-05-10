import re


def is_valid_password(password):
    """验证密码：请输入字母（区分大小写）、数字、符号中的至少两种8-64个字符"""
    re_password = r'(?!^\d+$)(?!^[A-Z]+$)(?!^[a-z]+$)(?!^[~!@#$%^&*()_+-=,.?]+$)^\S{8,64}$'

    if password and isinstance(password, str):
        if re.match(re_password, password):
            return True
        return False
    return False


def is_phone(phone):
    """验证手机号"""
    if not phone:
        return False
    if not re.match(r'1\d{10}$', phone):
        return False

    return True


