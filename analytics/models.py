from datetime import datetime

from django.db import models

from blog.models import Post


# Сравнение показателей за одну-
# -неделю со следующей и за счет этого вычислять насколько повысилось или понизилось процентный показатель
import datetime
from comments.models import Like


def get_week(date):
    """Возвращает список дат недели (начиная с понедельника)."""
    day_idx = date.weekday()  # Понедельник = 0, воскресенье = 6
    monday = date - datetime.timedelta(days=day_idx)
    return [monday + datetime.timedelta(days=i) for i in range(7)]

class TotalPost(models.Model):
    date = models.DateField(auto_now_add=True)
    post_count = models.IntegerField(default=0)
    percentage_change = models.FloatField(null=True, blank=True)  # Храним % изменения
    # получить кол-во постов за неделю и сравнить их с нынешней

    @classmethod
    def update_weekly_data(cls):
        """Считает количество постов за неделю, процентное изменение и сохраняет в базу."""
        today = datetime.datetime.now().date()

        # Получаем даты для текущей и прошлой недели
        current_week = get_week(today)
        previous_week = get_week(today - datetime.timedelta(weeks=1))

        # Считаем количество постов
        current_week_posts = Post.objects.filter(created_at__range=(current_week[0], current_week[-1])).count()
        previous_week_posts = Post.objects.filter(created_at__range=(previous_week[0], previous_week[-1])).count()

        # Вычисляем процентное изменение
        if previous_week_posts == 0:
            percentage_change = None  # Нет данных для сравнения
        else:
            percentage_change = ((current_week_posts - previous_week_posts) / previous_week_posts) * 100

        # Сохраняем данные в модель
        cls.objects.create(
            post_count=current_week_posts,
            percentage_change=percentage_change
        )

        print(f"Записано в базу: {current_week_posts} постов, изменение: {percentage_change}%")

class TotalLikes(models.Model):
    data = models.DateTimeField(auto_now_add=True)
    like_count = models.IntegerField(default=0)
    percentage_change = models.FloatField(blank=True, null=True)

    @classmethod
    def update_weekly_data(cls, user):
        """Считает количество постов за неделю, процентное изменение и сохраняет в базу."""
        today = datetime.datetime.now().date()
        user_posts = Post.objects.filter(author=user)
        # Получаем даты для текущей и прошлой недели
        current_week = get_week(today)
        previous_week = get_week(today - datetime.timedelta(weeks=1))

        # Считаем количество постов
        current_week_likes = Like.objects.filter(content_type=user_posts, created_at__range=(current_week[0], current_week[-1])).count()
        previous_week_likes = Like.objects.filter(content_type=user_posts, created_at__range=(previous_week[0], previous_week[-1])).count()

        # Вычисляем процентное изменение
        if previous_week_likes == 0:
            percentage_change = None  # Нет данных для сравнения
        else:
            percentage_change = ((current_week_likes - previous_week_likes) / previous_week_likes) * 100

        # Сохраняем данные в модель
        cls.objects.create(
            like_count=current_week_likes,
            percentage_change=percentage_change
        )

        print(f"Записано в базу: {current_week_likes} постов, изменение: {percentage_change}%")
#
# class TotalViews(models.Model):
#     pass
#
# class Comments(models.Model):
#     pass
