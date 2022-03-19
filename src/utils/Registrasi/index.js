import { View, Text, Image, Dimensions, ScrollView, StyleSheet } from 'react-native'
import React, { useState } from 'react'

const cekEmail = (email) => {
    let polaRegexAwal = /^([A-Za-z][A-Za-z0-9\-\.\_]*)/
    let polaRegexTengah = /\@([A-Za-z][A-Za-z0-9\-\_]*)/
    let polaRegexAkhhir = /(\.[A-Za-z][A-Za-z0-9\-\_]*)+$/
    if (email && typeof email === "string") {
        if (polaRegexAwal.test(email)) {
            if (polaRegexTengah.test(email.substring(email.indexOf("@"), email.length - 1))) {
                if (polaRegexAkhhir.test(email.substring(email.indexOf(".", email.indexOf("@")), email.length + 1))) {
                    return "VALID"
                }
                else {
                    return "Harus ada Domain (Ex: .com)"
                }
            }
            else {
                return "Harus ada @ dan domain (ex: @binar.com)"
            }
        }
        else {
            return "INVALID"
        }
    }
    else {

        return "email tidak boleh kosong"
    }
}

const cekPassword = (password) => {

    if (password && typeof password === "string") {
        const minimalDelapanHuruf = password.length >= 8
        const minimalSatuHurufBesar = password.match(/[A-Z]/g)
        const minimalSatuHurufKecil = password.match(/[a-z]/g)
        const minimalSatuAngka = password.match(/[0-9]/g)

        if (minimalDelapanHuruf) {
            if (minimalSatuHurufBesar) {
                if (minimalSatuHurufKecil) {
                    if (minimalSatuAngka) {
                        return "Password Sudah Kuat"
                    } else {
                        return "Password minimal mengandung 1 Angka"
                    }
                } else {
                    return "Password minimal mengandung 1 huruf kecil"
                }
            } else {
                return "Password minimal mengandung 1 huruf Besar"
            }
        } else {
            return "Password minimal mengandung 8 karakter"
        }
    }
    else {
        return "Password tidak boleh kosong"
    }


}


export { cekEmail, cekPassword }