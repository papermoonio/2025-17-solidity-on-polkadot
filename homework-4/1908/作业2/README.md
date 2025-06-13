由于 MiniDex 合约字节码过大，即使在 Remix 中开启了 enable optimization 并多次调整参数，仍然无法顺利部署到 Asset Hub。因此，我将 MiniDex 进行了精简，保留了最核心的 swap 和添加流动性（addLiquidity）功能，简化为 MiniMiniDex 合约。其余复杂功能（如多种流动性管理、LP Token、费率计算等）均已去除，以保证部署顺利完成。
具体部署、交互流程与截图详见附件。
