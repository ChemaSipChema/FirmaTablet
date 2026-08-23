import React, { useEffect, useState } from 'react';
import {  ActivityIndicator,  View,} from 'react-native';
import FirmaScreen from './src/screens/FirmaScreen';
import ConfiguracionScreen from './src/screens/ConfiguracionScreen';
import { cargarConfiguracion,} from './src/services/Configuracion';
import { ConfiguracionTablet } from './src/types/ConfiguracionTablet';


export default function App() {
  const [configuracion, setConfiguracion] = useState<ConfiguracionTablet | null>(null);
  const [cargando, setCargando] = useState(true);
  const [mostrarConfiguracion, setMostrarConfiguracion] = useState(false);
  useEffect(() => {
    iniciar();
  }, []);

  const iniciar = async () => {
    const config = await cargarConfiguracion();
    setConfiguracion(config);
    /*
     * Primera ejecución:
     * si no hay URL o TabletId,
     * abrimos configuración.
     */

    if (!config.url || !config.tabletId ) {
      setMostrarConfiguracion(true);
    }
    setMostrarConfiguracion(true)
    setCargando(false);
  };

  if (cargando || configuracion === null) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
        }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (mostrarConfiguracion) {
    return (
      <ConfiguracionScreen
        configuracion={configuracion}
        onGuardar={config => {
          setConfiguracion(config);
          setMostrarConfiguracion(false);
        }}
        onCancelar={
          configuracion.url
            ? () => setMostrarConfiguracion(false)
            : undefined
        }
      />
    );
  }

  return (
    <FirmaScreen
      configuracion={configuracion}
      onConfiguracion={() => {
        setMostrarConfiguracion(true);
      }}
    />
  );
}