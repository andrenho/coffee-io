FROM golang:alpine AS build
WORKDIR /src/
COPY *.go /src/
ENV CGO_ENABLED 0
ENV GOOS linux
RUN apk add git \
  && go get github.com/go-sql-driver/mysql \
  && go build -a -installsuffix cgo -o /bin/dbcleaner

FROM scratch
COPY --from=build /bin/dbcleaner /bin/dbcleaner
ENTRYPOINT ["/bin/dbcleaner"]
