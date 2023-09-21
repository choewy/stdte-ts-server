# Kafka

## Zookeeper

```yaml
zookeeper:
  image: confluentinc/cp-zookeeper:7.5.0
  environment:
    ZOOKEEPER_SERVER_ID: 1
    ZOOKEEPER_CLIENT_PORT: 2181
    ZOOKEEPER_TICK_TIME: 2000
    ZOOKEEPER_INIT_LIMIT: 5
    ZOOKEEPER_SYNC_LIMIT: 2
  ports:
    - 22181:2181
```

- `ZOOKEEPER_SERVER_ID`: 클러스터 내 zookeeper 식별 아이디
  - 이 옵션은 멀티 브로커에서 유효한 속성이다.
  - 동일 클러스터 내에서 이 값은 중복되면 안 된다.
- `ZOOKEEPER_CLIENT_PORT`: zookeeper의 클라이언트 PORT
  - 기본 포트는 2181이며, 기본 포트로 지정 시 컨테이너 내부에서 2181로 실행된다.
- `ZOOKEEPER_TICK_TIME`: zookeeper가 클러스터를 구성할때 동기화를 위한 기본 틱 타임
  - millisecond 단위로 지정할 수 있다.
- `ZOOKEEPER_INIT_LIMIT`: zookeeper 초기화를 위한 제한 시간
  - 이 옵션은 멀티 브로커에서 유효한 속성이다.
  - 주키퍼 클러스터는 쿼럼이라는 과정을 통해서 마스터를 선출하는데, 이때 주키퍼들이 리더에게 커넥션을 맺을때 지정할 초기 타임아웃 시간임.
  - 타임아웃 시간은 이전에 지정한 ZOOKEEPER_TICK_TIME 단위로 설정된다.
  - ZOOKEEPER_TICK_TIME = 2000, ZOOKEEPER_INIT_LIMIT = 5인 경우 2000 \* 5 = 10000 ms(10초)
- `ZOOKEEPER_SYNC_LIMIT`: zookeeper leader와 나머지 서버들의 싱크 타임
  - 이 옵션은 멀티 브로커에서 유효한 속성이다.
  - 지정한 시간내 싱크 응답이 들어오는 경우 클러스터가 정상으로 구성되어 있음을 확인한다.
  - ZOOKEEPER_TICK_TIME = 2000, ZOOKEEPER_SYNC_LIMIT = 2 경우, 2000 \* 2 = 4000 ms(4초)

## Kafa

```yaml
kafka:
  image: confluentinc/cp-kafka:7.5.0
  depends_on:
    - zookeeper
  ports:
    - 29095:29092
  environment:
    KAFKA_BROKER_ID: 1
    KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
    KAFKA_INTER_BROKER_LISTENER_NAME: PLAINTEXT
    KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://kafka:9095,PLAINTEXT_HOST://localhost:29095
    KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: PLAINTEXT:PLAINTEXT,PLAINTEXT_HOST:PLAINTEXT
    KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1
    KAFKA_GROUP_INITIAL_REBALANCE_DELAY_MS: 0
```

- `KAFKA_BROKER_ID`: 클러스터 내 kafka 브로커 식별 아이디
  - 이 옵션은 멀티 브로커에서 유효한 속성이다.
  - 동일 클러스터 내에서 이 값은 중복되면 안 된다.
- `KAFKA_ZOOKEEPER_CONNECT`: kafka가 zookeeper에 연결하기 위한 대상
  - {{ SERVICE NAME }}:{{ ZOOKEEPER CLIENT PORT }}
- `KAFKA_INTER_BROKER_LISTENER_NAME`: 도커 내부에서 사용할 리스너 이름
- `KAFKA_ADVERTISED_LISTENERS`: 외부에서 접속하기 위한 리스너 설정
- `KAFKA_LISTENER_SECURITY_PROTOCOL_MAP`: 보안을 위한 프로토콜 매핑
  - KAFKA_ADVERTISED_LISTENERS와 함께 key:value로 매핑된다.
- `KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR`: topic partition의 복제 개수
  - 단일 브로커에서만 유효한 속성이다.
- `KAFKA_GROUP_INITIAL_REBALANCE_DELAY_MS`: kafka 그룹의 초기 리밸런싱 시 컨슈머들이 컨슈머 그룹에 조인하기까지의 대기 시간

## Docker Compose 실행

```
docker-compose -f docker-compose-single.yaml up --build -d
```

## Topic 생성

```
docker-compose -f docker-compose-single.yaml exec kafka kafka-topics \
  --create \
  --topic test \
  --bootstrap-server kafka:9095 \
  --replication-factor 1\
  --partitions 1
```

- `--create`: kafka topic 생성
- `--topic`: 생성할 topic 이름
- `--bootstrap-server`: KAFKA_ADVERTISED_LISTENERS의 브로커 서비스
- `--replication-factor`: topic partition의 복제 개수(단일 브로커인 경우)
- `--partitions`: topic 내 partition 개수

## Topic 확인

```
docker-compose -f docker-compose-single.yaml exec kafka kafka-topics \
  --describe \
  --topic test \
  --bootstrap-server kafka:9095
```

- `--describe`: 생성된 topic의 상세 정보 조회
- `--topic`: 생성할 topic 이름
- `--bootstrap-server`: KAFKA_ADVERTISED_LISTENERS의 브로커 서비스

## Console Consumer 실행

```
docker-compose -f docker-compose-single.yaml exec kafka bash

kafka-console-consumer \
  --topic test \
  --bootstrap-server kafka:9095
```

## Console Producer 실행

```
docker-compose -f docker-compose-single.yaml exec kafka bash

kafka-console-producer \
  --topic test \
  --broker-list kafka:9095
```

## Docker Compose 종료

```
docker-compose -f docker-compose-single.yaml down
```
