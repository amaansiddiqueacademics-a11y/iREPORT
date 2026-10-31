"""Make ireport_sla_hours() fall back to the default hours.

0019 made ireport_sla_hours() read response_settings. When a row is missing (the table was emptied, for example by
TRUNCATE users CASCADE through the updated_by foreign key) the function returned NULL, so every due date became NULL
and no complaint could ever be overdue. Now a missing row falls back to the defaults: 24 h, 72 h, 336 h, 720 h.

Revision ID: 0020
Revises: 0019
"""
import sqlalchemy as sa
from alembic import op

revision = "0020"
down_revision = "0019"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.get_bind().execute(sa.text("""CREATE OR REPLACE FUNCTION ireport_sla_hours(risk int) RETURNS int LANGUAGE sql STABLE AS $$
        SELECT COALESCE(
            (SELECT hours FROM response_settings
             WHERE name = CASE WHEN risk >= 12 THEN 'Emergency' WHEN risk >= 8 THEN 'Urgent' WHEN risk >= 4 THEN 'Routine' ELSE 'Planned' END),
            CASE WHEN risk >= 12 THEN 24 WHEN risk >= 8 THEN 72 WHEN risk >= 4 THEN 336 ELSE 720 END) $$"""))
    # Restore any default rows that went missing, so the admin panel shows all four again.
    op.get_bind().execute(sa.text("""INSERT INTO response_settings (name, hours)
        VALUES ('Emergency', 24), ('Urgent', 72), ('Routine', 336), ('Planned', 720) ON CONFLICT (name) DO NOTHING"""))


def downgrade() -> None:
    op.get_bind().execute(sa.text("""CREATE OR REPLACE FUNCTION ireport_sla_hours(risk int) RETURNS int LANGUAGE sql STABLE AS $$
        SELECT hours FROM response_settings
        WHERE name = CASE WHEN risk >= 12 THEN 'Emergency' WHEN risk >= 8 THEN 'Urgent' WHEN risk >= 4 THEN 'Routine' ELSE 'Planned' END $$"""))
