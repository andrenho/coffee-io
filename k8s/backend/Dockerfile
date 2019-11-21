FROM golang:alpine AS build
WORKDIR /src/
COPY *.go /src/
ENV CGO_ENABLED 0
ENV GOOS linux
RUN apk add git \
  && go get github.com/go-sql-driver/mysql \
  && go build -a -installsuffix cgo -o /bin/backend

FROM scratch
COPY --from=build /bin/backend /bin/backend
ENTRYPOINT ["/bin/backend"]
