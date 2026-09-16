---
name: project-fix-verify
description: "Use when: depurar un bug, encontrar la causa raíz en el código existente, implementar una corrección puntual o validar un cambio con la prueba más pequeña y relevante."
---

# Corrección y verificación del proyecto

## Propósito
Gestiona defectos y cambios pequeños del producto en este repositorio siguiendo un flujo disciplinado: confirmar el síntoma, aislar la causa raíz, implementar la corrección más pequeña y segura, y verificar el resultado con evidencia.

## Flujo de trabajo

1. Clarificar el objetivo
   - Confirmar el bug, error o comportamiento solicitado.
   - Definir el resultado esperado y el área más pequeña afectada.
   - Si la petición es vaga, pedir el síntoma exacto, los pasos de reproducción y los criterios de éxito.

2. Ubicar el código relevante
   - Buscar de forma estrecha los símbolos, rutas, servicios, pruebas o configuración implicados.
   - Leer solo los archivos necesarios para confirmar el camino de implementación.
   - Priorizar la cadena real de llamadas sobre una exploración amplia.

3. Reproducir o validar la falla
   - Ejecutar el comando o prueba más pequeño que demuestre el problema.
   - Capturar el error exacto, el stack trace o la salida incorrecta antes de tocar el código.
   - Si no existe reproducción automatizada, añadir una prueba que falle por el comportamiento real cuando el alcance esté claro.

4. Diagnosticar la causa raíz
   - Rastrear el flujo de datos y las suposiciones detrás de él.
   - Revisar los desacoples entre el comportamiento esperado y el real.
   - Mantener la explicación basada en el código y no en suposiciones.

5. Implementar la corrección mínima
   - Cambiar solo lo necesario para resolver la causa raíz.
   - Evitar refactors, limpiezas o cambios no relacionados.
   - Mantener las convenciones y patrones existentes del proyecto.

6. Verificar antes de cerrar
   - Volver a ejecutar las pruebas o validaciones más pequeñas y relevantes.
   - Confirmar que la corrección resuelve el síntoma original y no solo el mensaje visible.
   - Si el comportamiento afecta a usuarios, validar también el flujo de integración o navegador disponible.

7. Resumir la evidencia
   - Indicar qué se cambió, por qué era necesario y qué se verificó.
   - Incluir el comando o prueba exacta utilizada y su resultado.
   - Señalar riesgos o tareas pendientes que queden.

## Puntos de decisión
- Si el problema no está claro, detenerse y recopilar el síntoma exacto y los pasos de reproducción.
- Si no existe cobertura de pruebas, añadir una antes de corregir cuando el comportamiento esté bien definido.
- Si la causa raíz no queda clara tras el primer análisis, reducir la investigación y revisar el límite o dependencia más cercana.
- Si la corrección se sale del alcance, pausar, volver a acotar y mantener el cambio quirúrgico.

## Criterios de finalización
- La causa raíz ha sido identificada y explicada.
- Existía una validación reproducible o con fallo antes del cambio.
- La corrección es mínima y está ligada directamente a la causa raíz.
- Las pruebas relevantes pasan después del cambio.
- El resumen final incluye evidencia y advertencias o pendientes.

## Prompts típicos que soporta esta skill
- "Depura el flujo de autenticación que falla en esta app."
- "Encuentra la causa raíz del cálculo incorrecto de créditos y corrígelo."
- "Añade una prueba de regresión para este comportamiento y luego arregla el problema."
- "Valida el cambio con el comando más pequeño posible antes de darlo por terminado."
