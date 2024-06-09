//
//  BluetoothManager.swift
//  ReactNativeBLE
//
//  Created by Wirawan on 8/6/24.
//

import CoreBluetooth
import React

@objc(BluetoothManager)
class BluetoothManager: RCTEventEmitter {
    var centralManager: CBCentralManager!
    var connectedPeripheral: CBPeripheral?
    var peripherals = [CBPeripheral]()

    override init() {
        super.init()
        centralManager = CBCentralManager(delegate: self, queue: nil)
    }

    // Override to specify the list of events supported
    override func supportedEvents() -> [String]! {
        return [BluetoothEvent.deviceDiscovered.rawValue, BluetoothEvent.stateChange.rawValue]
    }
  
    private func getBluetoothStateValue(centralManagerState: CBManagerState) -> String {
      var state: String
    
      switch centralManagerState {
      case .poweredOn:
        state = BluetoothState.poweredOn.rawValue
      case .poweredOff:
        state = BluetoothState.poweredOff.rawValue
      case .resetting:
        state = BluetoothState.resetting.rawValue
      case .unauthorized:
        state = BluetoothState.unauthorized.rawValue
      case .unsupported:
        state = BluetoothState.unsupported.rawValue
      case .unknown:
        state = BluetoothState.unknown.rawValue
      @unknown default:
        state = BluetoothState.unknown.rawValue
      }
      return state;
    }

    // Start scanning for devices
    @objc func startScanning() {
        peripherals.removeAll()  // Clear the previous list
        if centralManager.state == .poweredOn {
            centralManager.scanForPeripherals(withServices: nil, options: nil)
        } else {
          debugPrint("Bluetooth is not powered on.")
        }
    }

    // Stop scanning for devices
    @objc func stopScanning() {
        centralManager.stopScan()
    }
  
    // get bluetooth state
    @objc func getBluetoothState(_ callback: RCTResponseSenderBlock) {
      let state = getBluetoothStateValue(centralManagerState: centralManager.state)
      callback([state])
    }

    // Required for React Native
    @objc override static func requiresMainQueueSetup() -> Bool {
        return true
    }
}

// MARK: CBCentralManagerDelegate methods
extension BluetoothManager: CBCentralManagerDelegate {
  
  func centralManagerDidUpdateState(_ central: CBCentralManager) {
    let state: String = getBluetoothStateValue(centralManagerState: central.state)
    self.sendEvent(withName: BluetoothEvent.stateChange.rawValue, body: state)
  }
}

// MARK: CBPeripheralDelegate
extension BluetoothManager: CBPeripheralDelegate {
  func centralManager(_ central: CBCentralManager, didDiscover peripheral: CBPeripheral, advertisementData: [String: Any], rssi RSSI: NSNumber) {
    
    // Add discovered peripheral to the list
    if !peripherals.contains(peripheral) {
      peripherals.append(peripheral)
      
      // Create a Peripheral instance
      let discoveredPeripheral = Peripheral(
        id: peripheral.identifier.uuidString,
        name: peripheral.name ?? "Unnamed Device",
        rssi: RSSI,
        advertisementData: advertisementData
      )
        
      // Emit an event to React Native with the discovered peripheral information
      sendEvent(withName: BluetoothEvent.deviceDiscovered.rawValue, body: discoveredPeripheral.toDictionary())
    }
  }
}
