
from django.db import models


class TopicManager(models.Manager):
    # Topic操作に関する処理を追加
    pass


class CommentManager(models.Manager):
    # Comment操作に関する処理を追加
    pass


class CategoryManager(models.Manager):
    # Category操作に関する処理を追加
    pass


class Category(models.Model):
    name = models.CharField(
        'カテゴリー名',
        max_length=50,
    )
    url_code = models.CharField(
        'URLコード',
        max_length=50,
        null=True,
        blank=False,
        unique=True,
    )
    sort = models.IntegerField(
        verbose_name='ソート',
        default=0,
    )
    objects = CategoryManager

    def __str__(self):
        return self.name


class Topic(models.Model):
    user_name = models.CharField(
        'お名前',
        max_length=30,
        null=True,
        blank=False,
    )
    title = models.CharField(
        'タイトル',
        max_length=255,
        null=False,
        blank=False,
    )
    message = models.TextField(
        verbose_name='本文',
        null=True,
        blank=False,
    )
    category = models.ForeignKey(
        Category,
        verbose_name='カテゴリー',
        on_delete=models.PROTECT,
        null=True,
        blank=False,
    )
    created = models.DateTimeField(
        auto_now_add=True,
    )
    modified = models.DateTimeField(
        auto_now=True,
    )
    objects = TopicManager()

    def __str__(self):
        return self.title


class Comment(models.Model):
    id = models.BigAutoField(
        primary_key=True,
    )
    no = models.IntegerField(
        default=0,
    )
    user_name = models.CharField(
        'お名前',
        max_length=30,
        null=True,
        blank=False,
    )
    topic = models.ForeignKey(
        Topic,
        on_delete=models.PROTECT,
    )
    message = models.TextField(
        verbose_name='投稿内容'
    )
    pub_flg = models.BooleanField(
        default=True,
    )
    created = models.DateTimeField(
        auto_now_add=True,
    )
    objects = CommentManager()

    def __str__(self):
        return '{}-{}'.format(self.topic.id, self.no)
