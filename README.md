# KTWiz 홈페이지 개선 프로젝트

KT Wiz 홈페이지의 UI/UX를 개선하는 프로젝트로, 사용자의 편의성과 데이터 접근성을 높이기 위해 다양한 차트와 직관적인 디자인을 제공합니다. KT Wiz의 상징색을 기반으로 전체적인 디자인을 수정하였으며, 스켈레톤 UI를 도입하여 로딩 중 사용자 경험을 강화하였습니다. 또한, 주요 데이터는 막대 차트, 선 차트, 산점도 차트 등 다양한 형태의 시각화를 통해 사용자가 데이터를 쉽게 이해하고 활용할 수 있도록 개선하였습니다. 이를 통해 경기 정보, 선수 성적, 팀 순위 등의 데이터를 한눈에 파악할 수 있도록 하여 야구를 잘 알지 못하는 사용자도 한눈에 이해할 수 있도록 개선하였습니다. 기존 표 형식으로만 제공되던 주요 기록을 차트화하여 시각적으로 강화함으로써 데이터의 직관성과 분석 용이성을 더욱 높였습니다.

## 프로젝트 정보

- **목표**: KT Wiz 홈페이지 UI/UX 개선 및 데이터 시각화를 통해 사용자 친화적인 경험 제공
- **주요 개선 사항**:
  - Spring 기반으로 개발된 웹 어플리케이션을 React를 사용하여 최신 프론트엔드 기술로 전환 및 개선
  - 표 위주의 기존 페이지를 다양한 차트를 통해 직관적으로 개선
  - KT Wiz 상징색을 활용한 디자인 수정
  - 스켈레톤 UI 적용으로 로딩 중 사용자 경험 향상

시연 영상: https://youtu.be/Pj9B-ooke4o

배포 주소: https://kt-wiz-snifour.vercel.app/

<br/>

## 기술 스택

![diagram](https://velog.velcdn.com/images/dhdpekfa1/post/211ece56-f8b8-4871-bc32-1b35843b7005/image.jpg)

| 카테고리          | 사용 기술                         |
| ----------------- | --------------------------------- |
| **라이브러리**    | React + Vite                      |
| **언어**          | TypeScript                        |
| **스타일링/차트** | Tailwind CSS, Shadcn UI, recharts |
| **API/스토어**    | Tanstack Query, Axios, Zustand    |
| **프로젝트 관리** | Biome, Husky                      |
| **인증**          | Supabase                          |
| **배포**          | Vercel                            |

<br/>

## 팀원 소개

<table>
  <tr>
    <td style='text-align:center' width="212px">
      <a href="https://github.com/mal0070" target="_blank">
        <img src="https://avatars.githubusercontent.com/u/68420568?v=4" alt="민아 프로필" width="120px"/>
      </a>
    </td>
    <td style='text-align:center' width="212px">
      <a href="https://github.com/cozups" target="_blank">
        <img src="https://avatars.githubusercontent.com/u/58796245?v=4" alt="미소 프로필" width="120px"/>
      </a>
    </td>
    <td style='text-align:center' width="212px">
      <a href="https://github.com/dhdpekfa1" target="_blank">
        <img src="https://avatars.githubusercontent.com/u/149291445?v=4" alt="예닮 프로필" width="120px"/>
      </a>
    </td>
    <td style='text-align:center' width="212px">
      <a href="https://github.com/crqa453" target="_blank">
        <img src="https://avatars.githubusercontent.com/u/188017911?v=4" alt="주환 프로필" width="120px"/>
      </a>
    </td>
    <td style='text-align:center' width="212px">
      <a href="https://github.com/rara-record" target="_blank">
        <img src="https://avatars.githubusercontent.com/u/70184893?v=4" alt="보라 프로필" width="120px"/>
      </a>
    </td>
  </tr>
  <tr>
    <td style='text-align:center'>
      <a href="https://github.com/mal0070" target="_blank">
        민아
      </a>
    </td>
    <td style='text-align:center'>
      <a href="https://github.com/cozups" target="_blank">
        미소
      </a>
    </td>
     <td style='text-align:center'>
      <a href="https://github.com/dhdpekfa1" target="_blank">
        예닮
      </a>
    </td>
    <td style='text-align:center'>
      <a href="https://github.com/crqa453" target="_blank">
        주환
      </a>
    </td>
    <td style='text-align:center'>
      <a href="https://github.com/rara-record" target="_blank">
        보라
      </a>
    </td>
  </tr>
  <tr>
      <td style='text-align:center  word-break: keep-all' >팀장, 박스스코어, 응원단장, 찾아오기 페이지- 챗봇 구현, 카카오 로그인, 카카오 맵 구현</td>
      <td style='text-align:center  word-break: keep-all'>팀 대표자, 메인 페이지, 순위기록, 투수/타자 상세페이지, 미디어 페이지, 차트 구현 및 컴포넌트화, 무한 스크롤 구현</td>
      <td style='text-align:center  word-break: keep-all''>익산야구장, 경기정보, 관전포인트, 코칭스텝, 로그인/회원가입 페이지, 구글 로그인, 회원정보 수정 기능 구현</td>
      <td style='text-align:center  word-break: keep-all'>KT Wiz 소개(구단 소개, 구단 연혁), 티켓 구매(티켓 예매, 입장 요금)</td>
      <td style='text-align:center  word-break: keep-all'>리액트 쿼리 API 작성, Media 페이지 레이아웃 및 공통 배너 디자인</td>
  </tr>
</table>
<br/>

## 주요 기능

### 1. 디자인 개선

- 기존 탭 위치 및 배너 디자인을 현대적인 트렌드에 맞춰 업데이트.
- 직관적인 탐색을 위한 색상 강조 및 타이포그래피 활용.
- 애니메이션을 통해 시각적 피드백 강화.

### 2. WIZ PARK 지도 기능

- 카카오 맵 API를 활용한 동적 지도 서비스로 변경.
- 실시간 교통 상황 확인 및 빠른 길찾기 기능 추가.

### 3. 정규리그

- **경기 일정**: 날짜 선택 및 캐러셀 기능으로 이전/다음 경기 정보 제공.
- **박스스코어**: 주요 기록을 카드 형식으로 변경하여 시각적 요소 강화.
- **순위 기록**: 막대 차트, 선 차트, 산점도 차트를 활용한 데이터 시각화.
- **관전포인트**: 선발 투수 비교 차트 및 라인업 애니메이션 제공.

### 4. 플레이어

- **선수 상세 페이지**: 최근 5경기 및 통산 기록을 차트로 시각화.
- **응원단**: 다이얼로그를 통한 응원단 상세 정보 제공.

### 5. 미디어

- 뉴스 및 시구자 정보: 페이지네이션 적용.
- 포토/스토리/하이라이트: 무한 스크롤 및 상세 보기 기능 구현.
- HTML 렌더링 보안 문제를 해결한 커스텀 함수 적용.

### 6. 로그인 및 회원가입

- **Supabase**를 활용한 이메일/소셜 로그인.
- 사용자 정보 전역 상태 관리 및 로그아웃 시 데이터 초기화.

## 프로젝트 구조

```
src/
├── assets/                # 정적 자산 및 데이터
├── components/            # Shadcn UI 컴포넌트
├── constants/             # 공통 상수
├── features/              # 주요 기능별 디렉토리
│   └── [기능명]/
│       ├── components/    # 기능별 컴포넌트
│       ├── apis/          # API 관련 파일
│       ├── services/      # 기능 관련 유틸리티ㄹ
│       ├── types/         # 타입 정의
├── lib/                   # 공통 유틸 함수
├── pages/                 # 페이지 컴포넌트
```

<br/>

## 협업 방식

- **코어 타임**: 매일 13:00~18:00 집중 개발.
- **Git 워크플로우**:
  - main: 배포 브랜치
  - develop: 개발 브랜치
  - features: 기능별 브랜치
- **GitHub 프로젝트**: 작업 상황 및 TODO 관리.
- **이슈/PR 템플릿**: 작업 내용 명확화 및 결과 공유.
- **공통 컴포넌트 명세서**: 컴포넌트 역할 이해 및 재사용성 증대.

<br/>

## 개발 및 배포 가이드

### 개발 단계

1. **1~2주차**: 프로젝트 구조 설계 및 기본 UI 구성.
2. **3~4주차**: 상태 관리 및 주요 기능 구현.
3. **5주차**: 사용자 상호작용 기능 및 반응형 디자인.
4. **6~7주차**: 디버깅 및 배포, 발표 준비.

### 배포

- **Vercel**을 이용한 배포
