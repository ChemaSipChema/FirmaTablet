import AsyncStorage from '@react-native-async-storage/async-storage';
import { ConfiguracionTablet } from '../types/ConfiguracionTablet';

const CLAVE_CONFIG = 'configuracion_tablet';

export const configuracionInicial: ConfiguracionTablet = {
  url: 'https://hospitalochoa.net/intranet/Documentacion/Firmas/Tablet.aspx',
  tabletId: 'Tablet1',
  nombre: 'Tableta de Firma 1',
  ubicacion: 'Dpto. Informatica',
};

export async function guardarConfiguracion(
  configuracion: ConfiguracionTablet,
): Promise<void> {

  await AsyncStorage.setItem(
    CLAVE_CONFIG,
    JSON.stringify(configuracion),
  );
}

export async function cargarConfiguracion():
  Promise<ConfiguracionTablet> {
  const valor = await AsyncStorage.getItem(CLAVE_CONFIG);
  if (!valor) {
    return configuracionInicial;
  }
  try {
    return JSON.parse(valor) as ConfiguracionTablet;
  } catch {
    return configuracionInicial;
  }
}