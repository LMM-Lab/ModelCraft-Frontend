# ModelCraft
深層学習モデルを視覚的に構築・学習・推論ができるWebアプリ

## 目的
初学者の学習ハードルを下げる。深層学習は数式や理論ばかりで直感的にイメージすることが難しい。
そこで、視覚的な構築を通すことで、より効果的に学ぶことができる。
パラメーターの試行錯誤等を通すことで手軽に。

## デモ
学習機能  
![学習 (1) (1)](https://github.com/user-attachments/assets/cc0c870b-ca0e-42a1-834f-492dadb5d93a)

推論機能  
![推論 (4)](https://github.com/user-attachments/assets/58dfae89-d6fd-4f0e-aa18-400158aee104)

## URL
https://model-craft-frontend-qync.vercel.app/classification/train  
※リソースの関係でバックエンドはデプロイしていないので、限定的にしか動きません。バックエンドのリポジトリ→https://github.com/LMM-Lab/ModelCraft-Backend  

## 機能
* ユーザー登録、ログイン機能
* プロフィール変更機能
* 学習機能
  * 画像アップロード
  * モデル構築
  * 結果のグラフ化
* 推論機能
  * 画像アップロード
  * 作成したモデルを使った推論
  * 結果の表示

## 使用技術
*  Next.js
*  fastAPI
*  Docker
*  Postgress
*  celery_worker
*  redis

