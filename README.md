# Upbit Alim Bot

## Tech

- Node + Typescript
- AWS Lambda
- Redis (VM)
- fxts

## Func

- [ ] List of Coin (func)
  - [x] 초기 화면 -> Coin 전체 리스트 불러오기
  - [ ] (func)Redis에 저장 후 -> Cache 형태로 꺼내쓰기 (TTL)
- [ ] Select Favorite Coin (func)
  - 자신이 Observe 할 코인들 설정
- [ ] Stat (each favorite coin) (func)
  - [x] 가격 정보
  - [ ] 통계
- [ ] Alim Rush Up & Rush Down (cron)
  - [ ] 갑자기 오를 때
  - [ ] 갑자기 내릴 때
- [ ] Alim Target Price Alert (Up, Down) (cron)
  - [ ] 목표가 도달 && 도달 하기 전 알림
  - [ ] 팔려고 하는 가격 도달 && 도달 하기 전 알림

## Desc

<a href="https://docs.upbit.com/reference/ticker%ED%98%84%EC%9E%AC%EA%B0%80-%EC%A0%95%EB%B3%B4"> Upbit Developer API </a>
