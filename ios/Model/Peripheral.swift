//
//  Peripheral.swift
//  ReactNativeBLE
//
//  Created by Wirawan on 8/6/24.
//

import Foundation

struct Peripheral {
  let id: String
  let name: String
  let rssi: NSNumber
  let advertisementData: [String: Any]
  
  func toDictionary() -> [String: Any] {
    return [
      "id": id,
      "name": name,
      "rssi": rssi,
      "advertisementData": advertisementData
    ]
  }
}
