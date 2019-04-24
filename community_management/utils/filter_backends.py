from django_filters.rest_framework import DjangoFilterBackend
from django_filters.filterset import FilterSet
from django.db import models


class CustomFilterSet(FilterSet):

    @classmethod
    def filter_for_lookup(cls, f, lookup_type):
        ConcreteInFilter, params = super().filter_for_lookup(f, lookup_type)
        if isinstance(f, models.CharField):
            params['lookup_expr'] = 'icontains'

        return ConcreteInFilter, params


class CustomDjangoFilterBackend(DjangoFilterBackend):
    """模糊查询"""
    filterset_base = CustomFilterSet
