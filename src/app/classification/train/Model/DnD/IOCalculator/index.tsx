import { AffineParams, CNNParams, PoolingParams, LossFuncParams,TypeIO,paramsProps } from '../../types'

const AffineIOCalculator = (input: number[], params: AffineParams, batch?: number):TypeIO => {
  if (input.length === 0) {
    throw new Error("Input dimensions must not be empty");
  }
  // 入力次元数を計算
  const inputSize = input.length > 1 ? input.reduce((prev, curr) => prev * curr, 1) : input[0];
  // 入出力の形状を返す
  return {
    model: 'Affine',
    id:params.id,
    input: batch ? [batch, inputSize] : [inputSize],
    output: batch ? [batch, params.outputSize] : [params.outputSize],
  };
};


const CNNIOCalculator = (input: number[], params: CNNParams, batch?: number): TypeIO => {
  if (input.length === 0) {
    throw new Error("Input dimensions must not be empty");
  }
  
  // 入力次元の分岐処理
  let inChannels: number;
  let spatialDims: number[];
  
  if (input.length === 1) {
    // 一次元入力の場合の処理
    inChannels = 1; 
    spatialDims = input; // 一次元をそのまま空間次元として扱う
  } else if (input.length === 2) {
    inChannels = 1; 
    spatialDims = input; // 二次元入力
  } else if (input.length >= 3) {
    inChannels = input.slice(0, input.length - 2).reduce((a, b) => a * b, 1); // 前の次元をチャネル数とみなす
    spatialDims = input.slice(-2); // 最後の2次元を高さと幅
  } else {
    throw new Error("Unsupported input dimensions");
  }

  // 出力次元の計算
  const outputDims = spatialDims.map((dim) => {
    return Math.floor((dim + 2 * params.padding - params.kernel) / params.stride + 1);
  });
  const outputShape = [params.filters, ...outputDims];

  // 結果の返却
  return {
    model: 'CNN',
    id: params.id,
    input: batch ? [batch, inChannels, ...spatialDims] : [inChannels, ...spatialDims],
    output: batch ? [batch, ...outputShape] : [...outputShape],
  };
};

const PoolingIOCalculator = (input: number[], params: PoolingParams, batch?: number): TypeIO => {
  if (input.length === 0) {
    throw new Error("Input dimensions must not be empty");
  }

  // 入力次元の分岐処理
  let inChannels: number;
  let spatialDims: number[];

  if (input.length === 1) {
    // 一次元入力の場合
    inChannels = 1; // チャネル数を1とする
    spatialDims = input; // 入力次元をそのまま空間次元として扱う
  } else if (input.length === 2) {
    // 二次元データ
    inChannels = 1; // チャネル数を1とする
    spatialDims = input; // 空間次元として扱う
  } else if (input.length >= 3) {
    // 多次元データ
    inChannels = input.slice(0, input.length - 2).reduce((a, b) => a * b, 1); // 前の次元をチャネル数とみなす
    spatialDims = input.slice(-2); // 最後の2次元を高さと幅
  } else {
    throw new Error("Unsupported input dimensions");
  }

  // 各次元（高さ・幅）の出力サイズを計算
  const outputDims = spatialDims.map((dim) => {
    return Math.floor((dim + 2 * params.padding - params.kernel) / params.stride + 1);
  });

  // 出力の形状を決定
  const outputShape = [inChannels, ...outputDims];

  // 結果の返却
  return {
    model: 'Pooling',
    id: params.id,
    input: batch ? [batch, inChannels, ...spatialDims] : [inChannels, ...spatialDims],
    output: batch ? [batch, ...outputShape] : [...outputShape],
  };
};


const LossFuncIOCalculator = (input: number[], params: LossFuncParams,batch?:number):TypeIO => {
  if(batch){
    return {
      model: 'LossFunc',
      id:params.id,
      input: [batch, ...input],
      output: [batch, ...input],
    };
  } else {
    return {
      model: 'LossFunc',
      id:params.id,
      input: input,
      output: input,
    };
  }
}

const isAffineParams = (params: paramsProps): params is AffineParams => {
  return params.model === 'Affine';
};

const isCNNParams = (params: paramsProps): params is CNNParams => {
  return params.model === 'CNN';
};

const isPoolingParams = (params: paramsProps): params is PoolingParams => {
  return params.model === 'Pooling';
};

const isLossFuncParams = (params: paramsProps): params is LossFuncParams => {
  return params.model === 'LossFunc';
};

const IOCaculator = (input:number[], params: paramsProps, batch?: number) => {
  if (isAffineParams(params)) {
    return AffineIOCalculator(input, params, batch);
  } else if (isCNNParams(params)) {
    return CNNIOCalculator(input, params, batch);
  } else if (isPoolingParams(params)) {
    return PoolingIOCalculator(input, params, batch);
  } else 
  if (isLossFuncParams(params)) {
    return LossFuncIOCalculator(input, params, batch);
  } else {
    throw new Error('Invalid params type');
  }
};

export const LayerIOCalculator = (params: paramsProps[], initialInputSize: number[], batch?: number) => {
  let currentInputSize = [...initialInputSize];
  return params.map((param) => {
    const data = IOCaculator(currentInputSize, param, batch);

    // 次のレイヤーの入力を今のレイヤーの出力に置き換える
    currentInputSize = data.output;

    const layerIO: TypeIO = {
      model: data.model,
      id:param.id,
      input: data.input,
      output: data.output
    };
    return layerIO;
  });
};