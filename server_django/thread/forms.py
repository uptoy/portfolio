from django.forms import ModelForm
from . models import Topic


class TopicCreateForm(ModelForm):
    class Meta:
        model = Topic
        fields = [
            'title',
            'user_name',
            'category',
            'message',
        ]
