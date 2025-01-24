type AffineParams = {
  model: string
  inputSize: number
  outputSize: number
}

type CNNParams = {
  model: string
  filters: number
  kernel: number
  stride: number
  padding: number
}

type PoolingParams = {
  model: string
  kernel: number
  stride: number
  padding:number
}

type LossFuncParams = {
  model: string
}

type TypeIO = {
  model: 'Affine' | 'CNN' | 'Pooling' | 'LossFunc'
  input: [number]
  output: [number]
  batuch?: number
}

export type paramsProps=AffineParams|CNNParams|PoolingParams|LossFuncParams

const AffineIOCalculator = (input: number[], params: AffineParams, batch?: number) => {
  if (input.length === 0) {
    throw new Error("Input dimensions must not be empty");
  }
  // 入力次元数を計算
  const inputSize = input.length > 1 ? input.reduce((prev, curr) => prev * curr, 1) : input[0];
  // 入出力の形状を返す
  return {
    model: 'Affine',
    input: batch ? [batch, inputSize] : [inputSize],
    output: batch ? [batch, params.outputSize] : [params.outputSize],
  };
};


const CNNIOCalculator = (input: number[], params: CNNParams, batch?: number) => {
  if (input.length === 0) {
    throw new Error("Input dimensions must not be empty");
  }
  // 入力次元の分岐処理
  let inChannels: number;
  let spatialDims: number[];
  if (input.length === 2) {
    // 2次元データ (Affineの出力など)
    inChannels = 1; // チャネル数を1として扱う
    spatialDims = input;
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
  const outputShape = [params.filters, ...outputDims];
  return {
    model: 'CNN',
    input: batch ? [batch, inChannels, ...spatialDims] : [inChannels, ...spatialDims],
    output: batch ? [batch, ...outputShape] : [...outputShape],
  };
};

const PoolingIOCalculator = (input: number[], params: PoolingParams, batch?: number) => {
  if (input.length === 0) {
    throw new Error("Input dimensions must not be empty");
  }
  // 入力次元の分岐処理
  let inChannels: number;
  let spatialDims: number[];

  if (input.length === 2) {
    // 2次元データ (Affineの出力など)
    inChannels = 1; // チャネル数を1として扱う
    spatialDims = input;
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
  return {
    model: 'Pooling',
    input: batch ? [batch, inChannels, ...spatialDims] : [inChannels, ...spatialDims],
    output: batch ? [batch, ...outputShape] : [...outputShape],
  };
};




const isAffineParams = (params: paramsProps): params is AffineParams => {
  return params.model === 'Affine';
};

const isCNNParams = (params: paramsProps): params is CNNParams => {
  return params.model === 'CNN';
};

const isPoolingParams = (params: paramsProps): params is PoolingParams => {
  return params.model === 'Pooling';
};

export const IOCaculator = (input:number[], params: paramsProps, batch?: number) => {
  if (isAffineParams(params)) {
    return AffineIOCalculator(input, params, batch);
  } else if (isCNNParams(params)) {
    return CNNIOCalculator(input, params, batch);
  } else if (isPoolingParams(params)) {
    return PoolingIOCalculator(input, params, batch);
  } else {
    throw new Error('Invalid params type');
  }
};