from django.utils.deprecation import MiddlewareMixin


class DisableCSRFCheck(MiddlewareMixin):

    # def process_request(self, request):
    #     setattr(request, '_dont_enforce_csrf_checks', True)

    def process_response (self, request, response):
        # 简单请求:
        # 允许http://127.0.0.1:8001域向我发请求
        # ret['Access-Control-Allow-Origin']='http://127.0.0.1:8001'
        # 允许所有域向我发请求
        response['Access-Control-Allow-Origin'] = '*'
        if request.method == 'OPTIONS':
            # 所有的头信息都允许
            response['Access-Control-Allow-Headers'] = '*'
        return response


