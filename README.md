# XAP Digital Signal Processing Library

## Description

As a digital signal processing, the library implements following functions:
 - Read PCM data (signed, little-endian, 16-bits) to audio sample data.
 - Write audio sample data to PCM data (signed, little-endian, 16-bits).
 - Amplify an audio.
 - Do high-pass filter to audio data.
 - Do low-pass filter to audio data.
 - Resample an audio data.
 - Trim mute audio from an audio data.

## APIs

### (Module) XAPLibDSP.Core

The core module of digital signal processing.

#### (Function) XAPLibDSP.Core.Amplify(input, threshold, ampMinValue, ampMaxValue, [rounding])

Amplify an audio.

<u>Throw(s)</u>:
 - (*XAPDspParameterError*): 'threshold', 'ampMinValue' or 'ampMaxValue' is invalid.

<u>Parameter(s)</u>:
 - input (*Number[]*): The audio to be amplified.
 - threshold (*Number*): The silent threshold (must be non-negative).
 - ampMinValue (*Number*): The minimum amplified value (must be negative).
 - ampMaxValue (*Number*): The maximum amplified value (must be positive).

<u>Return value</u>:
 - (*Number[]*): The amplified audio data.

#### (Function) XAPLibDSP.Core.HighPass(input, rate, frequency, [rounding])

Do high-pass filter to audio data.

<u>Throw(s)</u>:
 - (*XAPDspParameterError*): 'rate' is non-positive or 'frequency' is non-positive.

<u>Parameter(s)</u>:
 - input (*Number[]*): The audio data.
 - rate (*Number*): The audio sample rate.
 - frequency (*Number*): The cut-off frequency.
 - rounding (*Boolean*): True if element of the output data should be rounded to integer.

<u>Return value</u>:
 - (*Number[]*): The filtered audio data.

#### (Function) XAPLibDSP.Core.ReadDataS16LE(data)

<u>Parameter(s)</u>:
 - data (*Buffer*): The PCM data.

<u>Return value</u>:
 - (*Number[]*): The audio sample data.

#### (Function) XAPLibDSP.Core.WriteDataS16LE(samples)

<u>Parameter(s)</u>:
 - samples (*Number[]*): The audio sample data.

<u>Return value</u>:
 - The PCM data.

#### (Function) XAPLibDSP.Core.LowPass(input, rate, frequency, [rounding])

Do low-pass filter to audio data.

<u>Throw(s)</u>:
 - (*XAPDspParameterError*): 'rate' is non-positive or 'frequency' is non-positive.

<u>Parameter(s)</u>:
 - input (*Number[]*): The audio data.
 - rate (*Number*): The audio sample rate.
 - frequency (*Number*): The cut-off frequency.
 - rounding (*Boolean*): True if element of the output data should be rounded to integer.

<u>Return value</u>:
 - (*Number[]*): The filtered audio data.

#### (Function) XAPLibDSP.Core.Resample(input, fromRate, toRate, [rounding])

Resample an audio data.

<u>Throw(s)</u>:
 - (*XAPDspParameterError*): 'fromRate' or 'toRate' is lower than 1.

<u>Parameter(s)</u>:
 - input (*Number[]*): Input data. 
 - fromRate (*Number*): Sample rate of the input data (unit: Hz).
 - toRate (*Number*): Sample rate of the output data (unit: Hz).
 - rounding (*Boolean*): True if element of the output data should be rounded to integer.

<u>Return value</u>:
 - Output data.

#### (Function) XAPLibDSP.Core.Trim(input, [trimLeft], [trimRight], [threshold])

<u>Throw(s)</u>:
 - (*XAPDspParameterError*): 'threshold' is negative.

<u>Parameter(s)</u>:
 - input (*Number[]*): Input data.
 - trimLeft (*Boolean*): True if left-hand side mute data should be trimmed.
 - trimRight (*Boolean*): True if right-hand side mute data should be trimmed.
 - threshold (*Number*): Threshold.

<u>Return value</u>:
 - (*Number[]*): Output data.

### (Module) XAPLibDSP.Error

The 'error' module of digital processing module.

#### (Class) XAPLibDSP.Error.XAPDspError

XAP digital signal processing error.

#### (Class) XAPLibDSP.Error.XAPDspParameterError

XAP digital signal processing parameter error.

## For developer

### How to release

1. Rolled package version.

Changed the 'version' item of the following file.

- package.json
- package-lock.json

And commit changes to the git repository.

2. Packs the current package folder, as following command:

```
npm pack
```

Generate the checksums of the SHA256 algorithm, such as POSIX command:

```
shasum -a 256 xaplibrary-dsp-{VERSION}.tgz > xaplibrary-dsp-{VERSION}.tgz.sha256
```

3. Copy the 'xaplibrary-dsp-{VERSION}.tgz' and 'xaplibrary-dsp-{VERSION}.tgz.sha256' to XAP NPM server.
