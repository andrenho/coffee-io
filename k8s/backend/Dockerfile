FROM golang:alpine AS build
WORKDIR /src/
COPY *.go /src/
RUN CGO_ENABLED=0 go build -o /bin/backend

FROM scratch
COPY --from=build /bin/backend /bin/backend
ENTRYPOINT ["/bin/backend"]
