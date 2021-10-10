import { defaultBgColor } from '@/constants/cssConst'
import React from 'react'

import { Link } from 'react-router-dom'
import ScrollableBox from '../atoms/ScrollableBox'
import TopBase from '../templates/TopBase'

const PrivacyPolicy: React.FC = ({ children }) => (
  <TopBase
    content={
      <ScrollableBox
        style={{
          backgroundColor: defaultBgColor,
        }}
      >
        <div style={{ width: '95%', padding: '10px' }}>
          <h1>プライバシーポリシー</h1>
          <h2>プライバシー情報</h2>
          <p>
            <ol>
              <li>
                プライバシー情報のうち「個人情報」とは、個人情報保護法にいう「個人情報」を指すものとし、生存する個人に関する情報であって、当該情報に含まれる氏名、生年月日、住所、電話番号、連絡先その他の記述等により特定の個人を識別できる情報を指します。
              </li>
              <li>
                プライバシー情報のうち「履歴情報および特性情報」とは、上記に定める「個人情報」以外のものをいい、ご利用頂いたサービスや、ご覧になったページや広告の履歴、ユーザーが検索した検索キーワード、ご利用時間帯、ご利用の方法、ご利用環境、郵便番号や性別、職業、年齢、ユーザーのIPアドレス、ウェブブラウザ情報（ユーザーエージェント）、クッキー情報、携帯端末の個体識別情報などを指します。
              </li>
            </ol>
          </p>
          <h2>個人情報の利用目的</h2>
          <p>
            当サイトでは、ユーザー情報の登録などの際に、名前（ハンドルネーム）等の個人情報をご登録いただく場合がございます。
            これらの個人情報は質問に対する回答やユーザの判別の場合に利用させていただくものであり、
            個人情報をご提供いただく際の目的以外では利用いたしません。
          </p>

          <h2>個人情報の第三者への開示</h2>
          <p>
            当サイトでは、個人情報は適切に管理し、以下に該当する場合を除いて第三者に開示することはありません。
          </p>
          <ul>
            <li>ユーザーのご了解がある場合</li>
            <li>法令等への協力のため、開示が必要となる場合</li>
            <li>
              ユーザーが本サービスの利用規約に違反し、運営者又は第三者の権利、財産やサービス等を保護するために、必要であると運営者が判断した場合
            </li>
          </ul>
          <h2>個人情報の開示、訂正、追加、削除、利用停止</h2>
          <p>
            ご本人からの個人データの開示、訂正、追加、削除、利用停止のご希望の場合には、ご本人であることを確認させていただいた上、速やかに対応させていただきます。
          </p>
          <h2>アクセス解析ツールについて</h2>
          <p>
            当サイトでは、Googleによるアクセス解析ツール「Googleアナリティクス」を利用しています。このGoogleアナリティクスはトラフィックデータの収集のためにCookieを使用しています。このトラフィックデータは匿名で収集されており、個人を特定するものではありません。この機能はCookieを無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。この規約に関して、詳しくは
            <a
              target="_blank"
              href="https://www.google.com/analytics/terms/jp.html"
              rel="noopener noreferrer"
            >
              こちら
            </a>
            をクリックしてください。
          </p>
          <h2>免責事項</h2>
          <p>
            当サイトからリンクやバナーなどによって他のサイトに移動された場合、移動先サイトで提供される情報、サービス等について一切の責任を負いません。
          </p>
          <p>
            当サイトのコンテンツ・情報につきまして、可能な限り正確な情報を掲載するよう努めておりますが、誤情報が入り込んだり、情報が古くなっていることもございます。
            当サイトに掲載された内容によって生じた損害等の一切の責任を負いかねますのでご了承ください。
          </p>
          <h2>プライバシーポリシーの変更について</h2>
          <p>
            当サイトは、個人情報に関して適用される日本の法令を遵守するとともに、本ポリシーの内容を適宜見直しその改善に努めます。
          </p>
          <p>
            修正された最新のプライバシーポリシーは常に本ページにて開示されます。
          </p>
          <h2>附則</h2>
          <p>制定：2021年10月10日</p>
        </div>
      </ScrollableBox>
    }
  />
)

export default PrivacyPolicy
