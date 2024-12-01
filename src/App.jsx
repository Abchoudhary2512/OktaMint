import React from 'react';
import { ThirdwebProvider } from '@thirdweb-dev/react';
import { OktoProvider, BuildType } from 'okto-sdk-react';
import Landing from './Landing';

const OKTO_CLIENT_API_KEY = '9c2a4512-f574-42a5-8da0-51c0c564ea08';
const CONTRACT_ADDRESS = '0x2B15063A6F8a11d18404C801F295b1d19dCC8574';

function App() {
  return (
    <OktoProvider apiKey={OKTO_CLIENT_API_KEY} buildType={BuildType.SANDBOX}>
      <ThirdwebProvider>
        <Landing contractAddress={CONTRACT_ADDRESS} />
      </ThirdwebProvider>
    </OktoProvider>
  );
}

export default App;
