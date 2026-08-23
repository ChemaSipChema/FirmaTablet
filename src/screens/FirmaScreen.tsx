import React, { useEffect, useMemo, useRef, useState } from 'react';
import {  ActivityIndicator,  PermissionsAndroid,  Platform,  StyleSheet,  Text,  TouchableOpacity,  View,} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import { ConfiguracionTablet } from '../types/ConfiguracionTablet';

interface Props {
  configuracion: ConfiguracionTablet;
  onConfiguracion: () => void;
}


export default function FirmaScreen({
  configuracion,
  onConfiguracion,
}: Props) {

  const webViewRef = useRef<WebView>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const pedirPermisosAndroid = async () => {
      if (Platform.OS !== 'android') {
        return;
      }
      // En Android 13+ no aplica READ/WRITE_EXTERNAL_STORAGE.
      if ((Platform.Version as number) >= 33) {
        return;
      }
      try {
        await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        ]);
      } catch (e) {
        console.log('No se pudieron solicitar permisos de almacenamiento', e);
      }
    };
    pedirPermisosAndroid();
  }, []);


  /*
   * Construimos la URL incluyendo la identificación
   * de la tablet.
   */
  const url = useMemo(() => {
    const separador = configuracion.url.includes('?') ? '&' : '?';

    return (
      configuracion.url + separador + 'tabletId=' + encodeURIComponent(configuracion.tabletId) +
      '&tabletNombre=' + encodeURIComponent(configuracion.nombre) + '&tabletUbicacion=' + encodeURIComponent(configuracion.ubicacion)
    );

  }, [configuracion]);


  if (error) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Text style={styles.errorTitulo}>
          No se puede conectar con el servidor
        </Text>
        <Text style={styles.errorTexto}>
          Compruebe la conexión de red y vuelva a intentarlo.
        </Text>
        <TouchableOpacity
          style={styles.boton}
          onPress={() => {
            setError(false);
            webViewRef.current?.reload();
          }}>
          <Text style={styles.botonTexto}>
            Reintentar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.botonConfiguracion}
          onPress={onConfiguracion}>
          <Text style={styles.configuracionTexto}>
            Configuración
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }


  return (

    <View style={styles.container}>
      <WebView
        ref={webViewRef}

        source={{
          uri: url,
        }}

        javaScriptEnabled={true}

        domStorageEnabled={true}

        startInLoadingState={true}

        cacheEnabled={false}

        thirdPartyCookiesEnabled={true}

        sharedCookiesEnabled={true}

        setSupportMultipleWindows={false}

        renderLoading={() => (

          <View style={styles.loading}>

            <ActivityIndicator size="large" />

            <Text style={styles.loadingText}>
              Cargando...
            </Text>

          </View>

        )}

        onError={() => {
          setError(true);
        }}

        onHttpError={event => {

          console.log(
            'HTTP:',
            event.nativeEvent.statusCode,
          );

        }}

        style={styles.webview}

      />


      {/*
        Inicialmente dejamos visible el acceso.
        Después podemos ocultarlo o protegerlo con PIN.
      */}

      <TouchableOpacity
        style={styles.configButton}
        onLongPress={onConfiguracion}
        delayLongPress={2500}>

        <Text style={styles.configButtonText}>
          •
        </Text>

      </TouchableOpacity>

    </View>
  );
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
  },

  webview: {
    flex: 1,
  },

  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },

  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },

  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },

  errorTitulo: {
    fontSize: 23,
    fontWeight: '600',
    textAlign: 'center',
  },

  errorTexto: {
    fontSize: 17,
    marginTop: 15,
    textAlign: 'center',
  },

  boton: {
    marginTop: 30,
    backgroundColor: '#1769aa',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 6,
  },

  botonTexto: {
    color: 'white',
    fontSize: 18,
  },

  botonConfiguracion: {
    marginTop: 20,
    padding: 15,
  },

  configuracionTexto: {
    fontSize: 16,
  },

  configButton: {
    position: 'absolute',
    right: 4,
    bottom: 4,
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },

  configButtonText: {
    fontSize: 20,
    opacity: 0.15,
  },

});