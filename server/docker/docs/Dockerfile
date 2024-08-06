ARG PYTHON_VERSION

FROM python:${PYTHON_VERSION}-slim-bookworm as python

FROM python AS python-build-stage

COPY ./docs/requirements.txt /requirements.txt

RUN pip wheel --wheel-dir /usr/docs/app/wheels \
  -r /requirements.txt

FROM python AS python-run-stage

ENV PYTHONUNBUFFERED 1

WORKDIR /app

RUN set -eux; \
    apt-get update; \
    apt-get install -y --no-install-recommends \
    graphviz \
    fonts-roboto \
    ; \
    rm -rf /var/lib/apt/lists/*

COPY --from=python-build-stage /usr/docs/app/wheels  /wheels/

RUN pip install --no-cache-dir --no-index --find-links=/wheels/ /wheels/* \
	&& rm -rf /wheels/

COPY ./docker/docs/start /start
RUN sed -i 's/\r//' /start
RUN chmod +x /start
RUN addgroup --system django \
    && adduser --system --ingroup django django
RUN mkdir /docs
RUN chown django:django /app
RUN chown django:django /docs

USER django
