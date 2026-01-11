# ModelCraft
深層学習モデルを視覚的に構築・学習・推論ができるWebアプリ

## 目的
深層学習初学者の習得ハードルを下げることを目的としています。    
深層学習の習得には、数式の難解さに加え、複雑なコーディングというプログラミングの壁が存在します。この理解及び実装のハードルが、初学者の理解を妨げる要因となってると考えました。  
ModelCraftは、視覚的な操作でモデル構築を完結させることで、コーディングの手間を取り除きました。これにより、プログラムの細かい理屈に囚われることなく、深層学習のイメージを直感的に固める事ができます。

## デモ
**学習機能**  
![モデル学習画面](https://github.com/user-attachments/assets/cc0c870b-ca0e-42a1-834f-492dadb5d93a)

**推論機能**  
![推論画面](https://github.com/user-attachments/assets/2a628468-cdcf-415e-8cfc-7112731560f2)

**登録・ログイン機能**  
![登録・ログイン](https://github.com/user-attachments/assets/0fbd9fc1-5378-4de2-b5f7-d81fecfce569)

**モデル保存**  
構築したモデルはここから確認できます  
<img width="600" height="312" alt="スクリーンショット 2026-01-11 1203a32" src="https://github.com/user-attachments/assets/5ef71182-f33b-49c3-95f1-506b17713008" />

## URL
https://model-craft-frontend-qync.vercel.app/classification/train  
**※稼働状況について**  
現在、クラウドコスト（GPUリソース等）の観点からバックエンドのデプロイは行っていないため、本URLではフロントエンドで動作する機能のみ確認可能です。 完全な動作はローカル環境で確認しており、バックエンドの方は以下のリポジトリで公開しています。  
[Backend Repository URL](https://github.com/LMM-Lab/ModelCraft-Backend)

## 機能
* ユーザー登録、ログイン機能
* プロフィール変更機能
* 学習機能
  * 画像アップロード
  * モデル構築
  * 学習プロセスの可視化（Loss/Accuracyグラフのリアルタイム表示）
* 推論機能
  * 画像アップロード
  * 作成したモデルを使った推論
  * 推論結果の表示

## 使用技術
**フロントエンド**
*  Next.js
*  typescript  

**バックエンド**
*  FastAPI
*  PyTorch
*  Docker
*  PostgreSQL
*  Celery
*  redis
*  Google Cloud Storage

**その他**
*  Figma
