import logging
from django.db import connections, OperationalError

# Настраиваем логгер для вывода сообщений об ошибках
logger = logging.getLogger(__name__)


class DatabaseRouter:
    """
    Роутер баз данных для автоматического переключения между основной и резервной базами.
    Если основная база данных недоступна, происходит переключение на резервную.
    """

    def _select_db(self) -> str:
        """
        Выбор базы данных для операции.

        Пытается установить соединение с основной базой данных.
        Если соединение не удается, переключается на резервную базу.

        Returns:
            str: Название выбранной базы данных ('default' или 'extra').
        """
        try:
            # Проверяем доступность основной базы данных
            connection = connections['default']
            connection.ensure_connection()
            return 'default'
        except OperationalError as e:
            # Логируем ошибку и переключаемся на резервную базу данных
            logger.error(f"Основная база данных недоступна, переключаемся на резервную: {e}")
            return 'extra'

    def db_for_read(self, model: type, **hints) -> str:
        """
        Определяет базу данных для операций чтения.

        Args:
            model (type): Модель, с которой производится работа.
            hints (dict): Дополнительные подсказки.

        Returns:
            str: Название базы данных.
        """
        return self._select_db()

    def db_for_write(self, model: type, **hints) -> str:
        """
        Определяет базу данных для операций записи.

        Args:
            model (type): Модель, с которой производится работа.
            hints (dict): Дополнительные подсказки.

        Returns:
            str: Название базы данных.
        """
        return self._select_db()

    def allow_relation(self, obj1: object, obj2: object, **hints) -> bool:
        """
        Определяет, разрешены ли отношения между двумя объектами.

        Args:
            obj1 (object): Первый объект.
            obj2 (object): Второй объект.
            hints (dict): Дополнительные подсказки.

        Returns:
            bool: True, если связь разрешена, иначе False.
        """
        db1 = self._select_db()
        db2 = self._select_db()
        return db1 == db2

    def allow_migrate(self, db: str, app_label: str, model_name: str = None, **hints) -> bool:
        """
        Определяет, разрешена ли миграция на указанной базе данных.

        Args:
            db (str): Название базы данных.
            app_label (str): Метка приложения.
            model_name (str, optional): Название модели.
            hints (dict): Дополнительные подсказки.

        Returns:
            bool: True, если миграция разрешена.
        """
        # Миграции проводим на всех базах данных
        return True


