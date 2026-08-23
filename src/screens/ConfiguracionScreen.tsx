import React, { useState } from 'react';
import {  Alert,  ScrollView,  StyleSheet,  Text,  TextInput,  TouchableOpacity,  View,} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {  guardarConfiguracion,} from '../services/Configuracion';
import { ConfiguracionTablet } from '../types/ConfiguracionTablet';

interface Props {
  configuracion: ConfiguracionTablet;
  onGuardar: (config: ConfiguracionTablet) => void;
  onCancelar?: () => void;
}

export default function ConfiguracionScreen({
  configuracion,
  onGuardar,
  onCancelar,
}: Props) {

  const [url, setUrl] = useState(configuracion.url);
  const [tabletId, setTabletId] = useState(configuracion.tabletId);
  const [nombre, setNombre] = useState(configuracion.nombre);
  const [ubicacion, setUbicacion] = useState(configuracion.ubicacion);

  const guardar = async () => {
    if (!url.trim()) {
      Alert.alert(
        'Configuración',
        'Debe indicar la URL del servidor.',
      );
      return;
    }
    if (!tabletId.trim()) {
      Alert.alert(
        'Configuración',
        'Debe indicar el identificador de la tablet.',
      );
      return;
    }
    const nuevaConfiguracion: ConfiguracionTablet = {
      url: url.trim(),
      tabletId: tabletId.trim(),
      nombre: nombre.trim(),
      ubicacion: ubicacion.trim(),
    };
    await guardarConfiguracion(
      nuevaConfiguracion,
    );
    onGuardar(
      nuevaConfiguracion,
    );
  };


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.titulo}>
          Configuración de tablet
        </Text>
        <Text style={styles.label}>
          URL del servidor
        </Text>
        <TextInput
          style={styles.input}
          value={url}
          onChangeText={setUrl}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="url"
          placeholder="https://hospitalochoa.net/intranet/Documentacion/Firma/Tablet.aspx"
        />
        <Text style={styles.label}>
          Identificador
        </Text>
        <TextInput
          style={styles.input}
          value={tabletId}
          onChangeText={setTabletId}
          autoCapitalize="characters"
          placeholder="TABLET01"
        />
        <Text style={styles.label}>
          Nombre
        </Text>
        <TextInput
          style={styles.input}
          value={nombre}
          onChangeText={setNombre}
          placeholder="Tablet Firma Recepción"
        />
        <Text style={styles.label}>
          Ubicación
        </Text>
        <TextInput
          style={styles.input}
          value={ubicacion}
          onChangeText={setUbicacion}
          placeholder="Recepción"
        />
        <View style={styles.botones}>
          {onCancelar && (
            <TouchableOpacity
              style={styles.botonSecundario}
              onPress={onCancelar}>
              <Text style={styles.textoSecundario}>
                Cancelar
              </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.botonGuardar}
            onPress={guardar}>
            <Text style={styles.textoGuardar}>
              Guardar
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  content: {
    padding: 30,
  },
  titulo: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 30,
  },
  label: {
    fontSize: 17,
    marginTop: 15,
    marginBottom: 7,
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 6,
    fontSize: 17,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  botones: {
    flexDirection: 'row',
    marginTop: 35,
    gap: 15,
  },
  botonGuardar: {
    flex: 1,
    backgroundColor: '#1769aa',
    padding: 16,
    borderRadius: 6,
    alignItems: 'center',
  },
  textoGuardar: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  botonSecundario: {
    padding: 16,
    borderRadius: 6,
    backgroundColor: '#ddd',
  },
  textoSecundario: {
    fontSize: 18,
  },

});