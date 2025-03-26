from api.spectacular.urls import urlpatterns as doc_urls
from users.urls import urlpatterns as auth_url
from blog.urls import urlpatterns as post_url
from comments.urls import urlpatterns as comma_url
api_name = 'api'

urlpatterns = []


urlpatterns += doc_urls
urlpatterns += auth_url
urlpatterns += post_url
urlpatterns += comma_url
