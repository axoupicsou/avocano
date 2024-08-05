#syntax=docker/dockerfile:1.4
FROM python:3.12.3-slim-bookworm as python

####################################################
FROM python as python-build-stage
ARG REQUIREMENTS_FILE=requirements.txt

RUN <<EOF
    set -eux
    apt-get update
    apt-get install -y --no-install-recommends build-essential \
      libpq-dev # psycopg dependencies

    rm -rf /var/lib/apt/lists/*
EOF

COPY requirements*.txt /

RUN pip wheel --wheel-dir /usr/src/app/wheels -r ${REQUIREMENTS_FILE}

####################################################
FROM python as base

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ARG APP_HOME=/gleephpro/
WORKDIR ${APP_HOME}

RUN <<EOF
    set -eux;
    apt-get update;
    apt-get install -y --no-install-recommends gettext \
      libpq-dev # psycopg dependencies
    rm -rf /var/lib/apt/lists/*
EOF

COPY --from=python-build-stage /usr/src/app/wheels  /wheels/

# use wheels to install python dependencies
RUN <<EOF
    pip install --no-cache-dir --no-index --find-links=/wheels/ /wheels/*
	rm -rf /wheels/
EOF

COPY ./ ${APP_HOME}

ENV PORT 8000

FROM base as local


FROM base as prod

ARG DOCKER_USER=django

RUN <<EOF
    addgroup --system ${DOCKER_USER}
    adduser --system --ingroup ${DOCKER_USER} ${DOCKER_USER}
EOF

RUN chown ${DOCKER_USER}:${DOCKER_USER} ${APP_HOME}

USER ${DOCKER_USER}

CMD exec gunicorn --bind 0.0.0.0:$PORT --workers 2 --threads 8 --timeout 0 config.wsgi:application
