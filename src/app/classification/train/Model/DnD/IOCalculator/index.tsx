import { AffineParams, CNNParams, PoolingParams, LossFuncParams,paramsProps } from '../../types'

const AffineIOCalculator = (input: number[], params: AffineParams, batch?: number):paramsProps => {
  if (input.length === 0) {
    throw new Error("先にデータを入力してください");
  }
  // 入力次元数を計算
  const inputSize = input.length > 1 ? input.reduce((prev, curr) => prev * curr, 1) : input[0];
  return {
    ...params,
    io:{
      input: batch ? [batch, inputSize] : [inputSize],
      output: batch ? [batch, params.outputSize] : [params.outputSize],
    }
  };
};


const CNNIOCalculator = (input: number[], params: CNNParams, batch?: number): paramsProps => {
  if (input.length === 0) {
    throw new Error("先にデータを入力してください");
  }
  let inChannels: number;
  let spatialDims: number[];
  if (input.length === 3) {
    // 三次元入力の処理
    if (input[0] !== params.inputChannel) {
      throw new Error("入力チャネルのサイズが一致しません");
    }
    inChannels = input[0]; // チャネル数
    spatialDims = input.slice(1); // 高さと幅
  } else {
    // 三次元以外の入力を `(inputChannel, height, width)` に変換
    const totalSize = input.reduce((a, b) => a * b, 1); 
    if (totalSize % params.inputChannel !== 0) {
      throw new Error("入力データの形状が仕様に適していません。他の値を試してください");
    }
    const spatialSize = totalSize / params.inputChannel;
    const height = Math.floor(Math.sqrt(spatialSize));
    const width = spatialSize / height;
    if (!Number.isInteger(width)) {
      throw new Error("入力データを正常な高さと幅に変更できません");
    }
    inChannels = params.inputChannel;
    spatialDims = [height, width];
  }
  // カーネルサイズの検証
  spatialDims.forEach((dim) => {
    if (params.kernel > dim + 2 * params.padding) {
      throw new Error(
        `カーネルサイズを ${dim + 2 * params.padding} 以下にしてください`
      );
    }
  });
// (${params.kernel}) 
  if (params.padding > Math.floor(params.kernel / 2)) {
    throw new Error(
      `パディングはカーネルサイズの半分以下である必要があります`
    );
  }
  
  // 高さと幅の出力サイズを計算
  const outputDims = spatialDims.map((dim) => {
    return Math.floor((dim + 2 * params.padding - params.kernel) / params.stride + 1);
  });
  const outputShape = [params.filters, ...outputDims];
  return {
    ...params,
    io:{
      input: batch ? [batch, inChannels, ...spatialDims] : [inChannels, ...spatialDims],
      output: batch ? [batch, ...outputShape] : [...outputShape],
    }
  };
};



const PoolingIOCalculator = (input: number[], params: PoolingParams, batch?: number): paramsProps => {
  if (input.length === 0) {
    throw new Error("先にデータを入力してください");
  }
  let inChannels: number;
  let spatialDims: number[];
  if (input.length === 3) {
    // 三次元入力の処理
    inChannels = input[0]; // チャネル数
    spatialDims = input.slice(1); // 高さと幅
  } else {
    // 三次元以外の入力を `(inputChannel, height, width)` に変換
    const totalSize = input.reduce((a, b) => a * b, 1); 
    if (totalSize % params.inputChannel !== 0) {
      throw new Error("入力データの形状が仕様に適していません。他の値を試してください");
    }
    const spatialSize = totalSize / params.inputChannel; 
    const height = Math.floor(Math.sqrt(spatialSize));
    const width = spatialSize / height;
    if (!Number.isInteger(width)) {
      throw new Error("入力データを正常な高さと幅に変更できません");
    }
    inChannels = params.inputChannel; 
    spatialDims = [height, width];
  }
  // カーネルサイズの検証
  spatialDims.forEach((dim) => {
    if (params.kernel > dim + 2 * params.padding) {
      throw new Error(
        `カーネルサイズを ${dim + 2 * params.padding})以下にしてください`
      );
    }
  });

  if (params.padding > Math.floor(params.kernel / 2)) {
    throw new Error(
      `パディングはカーネルサイズの半分以下である必要があります`
    );
  }

  // 高さと幅の出力サイズを計算
  const outputDims = spatialDims.map((dim) => {
    return Math.floor((dim + 2 * params.padding - params.kernel) / params.stride + 1);
  });
  const outputShape = [inChannels, ...outputDims];
  return {
    ...params,
    io:{
      input: batch ? [batch, inChannels, ...spatialDims] : [inChannels, ...spatialDims],
      output: batch ? [batch, ...outputShape] : [...outputShape],
    }
  };
};



const LossFuncIOCalculator = (input: number[], params: LossFuncParams,batch?:number):paramsProps => {
  if(batch){
    return {
      ...params,
      io:{
        input: [batch, ...input],
        output: [batch, ...input],
      }
    };
  } else {
    return {
      ...params,
      io:{
        input: input,
        output: input,
      }
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
    currentInputSize = data.io.output;

    const layerIO: paramsProps = {
      ...data,
      io:{
        input: data.io.input,
        output: data.io.output
      }
    };
    return layerIO;
  });
};