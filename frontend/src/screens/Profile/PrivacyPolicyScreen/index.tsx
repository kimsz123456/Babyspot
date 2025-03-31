import React from 'react';
import {ScrollView, Text} from 'react-native';
import * as S from './styles';

const PrivacyPolicyScreen = () => {
  return (
    <S.BackGround>
      <S.MainWrapper>
        <S.TitleText>개인정보 처리방침</S.TitleText>
        <S.ContentText>
          {' '}
          소쥬컴퍼니 ('www.sojyu.com'이하 '소쥬컴퍼니')은(는) 「개인정보
          보호법」 제30조에 따라 정보주체의 개인정보를 보호하고 이와 관련한
          고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이
          개인정보 처리방침을 수립·공개합니다.
        </S.ContentText>
        <S.DateText>최종 수정일: 2025년 3월 17일</S.DateText>
        <S.LineText>제1조(개인정보의 처리 목적)</S.LineText>
        <S.ContentText>
          {' '}
          소쥬컴퍼니 은(는) 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고
          있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용
          목적이 변경되는 경우에는 「개인정보 보호법」 제18조에 따라 별도의
          동의를 받는 등 필요한 조치를 이행할 예정입니다.
        </S.ContentText>
        <S.ListText>1. 회원가입 및 관리 </S.ListText>
        <S.ContentText>
          {'  '}- OAuth 인증을 통한 본인 식별 및 회원 관리
        </S.ContentText>
        <S.ContentText>
          {'  '}- 회원제 서비스 이용 및 접근 권한 관리
        </S.ContentText>
        <S.ListText>2. 서비스 제공 </S.ListText>
        <S.ContentText>{'  '}- 맞춤형 추천 서비스 제공</S.ContentText>
        <S.ContentText>
          {'  '}- 네이버 지도 API를 통한 위치 서비스 제공
        </S.ContentText>
        <S.ContentText>
          {'  '}- Firebase를 활용한 서비스 품질 개선 및 오류 분석
        </S.ContentText>
        <S.LineText>제2조(개인정보의 처리 및 보유 기간)</S.LineText>
        <S.ContentText>
          ① 소쥬컴퍼니 은(는) 법령에 따른 개인정보 보유·이용기간 또는
          정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간
          내에서 개인정보를 처리·보유합니다.
        </S.ContentText>
        <S.ContentText>
          ② 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.
        </S.ContentText>
        <S.ListText>1. OAuth 인증 정보(생년, 프로필 이미지)</S.ListText>
        <S.ContentText>{'  '}- 서비스 이용 기간 동안 보유</S.ContentText>
        <S.ListText>2. 로그 및 분석 정보(Firebase)</S.ListText>
        <S.ContentText>
          {'  '}- 통계 분석을 위해 일정 기간 저장 후 익명화 처리
        </S.ContentText>
        <S.ListText>3. 위치 정보(네이버 지도 API)</S.ListText>
        <S.ContentText>
          {'  '}- 사용자의 위치 요청 시에만 수집 및 활용
        </S.ContentText>
        <S.LineText>제3조(처리하는 개인정보의 항목)</S.LineText>
        <S.ContentText>
          ① 소쥬컴퍼니 은(는) 다음의 개인정보 항목을 처리하고 있습니다.
        </S.ContentText>
        <S.ListText>1. 필수 항목</S.ListText>
        <S.ContentText>
          {'  '}- OAuth 인증 정보(생년, 프로필 이미지)
        </S.ContentText>
        <S.ContentText>
          {'  '}- 네이버 지도 API 사용시 위치 데이터{' '}
        </S.ContentText>
        <S.ListText>2. 자동 수집 항목</S.ListText>
        <S.ContentText>
          {'  '}- Firebase를 통한 로그 및 서비스 이용 기록
        </S.ContentText>
        <S.LineText>제4조(개인정보의 파기절차 및 파기방법)</S.LineText>
        <S.ContentText>
          ① 소쥬컴퍼니 은(는) 개인정보 보유기간의 경과, 처리목적 달성 등
          개인정보가 불필요하게 되었을 때에는 지체 없이 해당 개인정보를
          파기합니다.
        </S.ContentText>
        <S.ContentText>② 파기 절차 및 방법은 다음과 같습니다.</S.ContentText>
        <S.ListText>1. 파기 절차</S.ListText>
        <S.ContentText>
          {'  '}- 불필요한 개인정보를 선정하고, 내부 관리 절차에 따라 즉시 파기{' '}
        </S.ContentText>
        <S.ListText>2. 파기 방법</S.ListText>
        <S.ContentText>
          {'  '}- 전자적 파일 형태의 정보는 복구할 수 없는 기술적 방법을
          사용하여 삭제, 종이 문서는 파쇄 또는 소각
        </S.ContentText>
        <S.LineText>제5조(개인정보의 제3자 제공)</S.LineText>
        <S.ContentText>
          {' '}
          소쥬컴퍼니 은(는) 정보주체의 개인정보를 제3자에게 제공하지 않습니다.
        </S.ContentText>
        <S.LineText>
          제6조(정보주체와 법정대리인의 권리·의무 및 행사 방법)
        </S.LineText>
        <S.ContentText>
          ① 정보주체는 소쥬컴퍼니에 대해 언제든지 개인정보
          열람·정정·삭제·처리정지 요구 등의 권리를 행사할 수 있습니다.
        </S.ContentText>
        <S.ContentText>
          ② 권리 행사는 아래의 방법을 통해 요청할 수 있습니다.
        </S.ContentText>
        <S.ListText>1. 이메일</S.ListText>
        <S.ContentText> workinghangyu@gmail.com</S.ContentText>
        <S.ListText>2. 고객센터</S.ListText>
        <S.ContentText>+82-010-2725-5285</S.ContentText>
        <S.LineText>제7조(개인정보의 안전성 확보조치)</S.LineText>
        <S.ContentText>
          {' '}
          소쥬컴퍼니 은(는) 개인정보의 안전성 확보를 위해 다음과 같은 조치를
          취하고 있습니다.
        </S.ContentText>
        <S.ListText>1. 데이터 암호화</S.ListText>
        <S.ContentText>
          개인정보를 안전한 암호화 기술을 이용하여 보호
        </S.ContentText>
        <S.ListText>2. 접근 제한</S.ListText>
        <S.ContentText>
          개인정보에 대한 접근 권한을 최소화하여 운영
        </S.ContentText>
        <S.ListText>3. 보안 솔루션</S.ListText>
        <S.ContentText>
          방화벽 및 침입 방지 시스템을 통해 보안 유지
        </S.ContentText>
        <S.LineText>제8조(개인정보 처리방침 변경 사항)</S.LineText>
        <S.ContentText>
          {' '}
          소쥬컴퍼니 은(는) 개인정보 처리방침을 변경할 수 있으며, 변경 사항이
          있을 경우 서비스 공지사항 또는 이메일을 통해 사전 공지합니다.
        </S.ContentText>
      </S.MainWrapper>
    </S.BackGround>
  );
};

export default PrivacyPolicyScreen;
