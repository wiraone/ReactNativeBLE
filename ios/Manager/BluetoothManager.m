//
//  BluetoothManager.m
//  ReactNativeBLE
//
//  Created by Wirawan on 8/6/24.
//


#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

// Declare the BluetoothManager module
@interface RCT_EXTERN_MODULE(BluetoothManager, RCTEventEmitter)

// Declare the startScanning method
RCT_EXTERN_METHOD(startScanning)

// Declare the stopScanning method
RCT_EXTERN_METHOD(stopScanning)

// Declare the getBluetoothState method
RCT_EXTERN_METHOD(getBluetoothState: (RCTResponseSenderBlock)callback)

@end
