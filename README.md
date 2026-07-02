
# Radio RCS Sicilia - App Ufficiale

Progetto dell'app ufficiale di Radio RCS Sicilia. L'APK/AAB e i file per il sito web vengono generati automaticamente ogni volta che vengono salvate modifiche su GitHub.

## 🚀 Come scaricare i pacchetti pronti
Ogni volta che modifichiamo l'app, GitHub genera i file pronti all'uso. 
1. Vai nella scheda **"Actions"** in alto.
2. Clicca sull'ultimo processo completato con successo ✅.
3. In fondo alla pagina, nella sezione **"Artifacts"**, troverai:

### 📱 Per gli Store (Android)
- **`app-debug.aab`**: Usa questo per **Google Play Store** (è il formato richiesto).
- **`app-debug.apk`**: Usa questo per **Amazon Appstore**, **Fire TV** o per installarlo direttamente sul tuo telefono per test.

### 🌐 Per il Sito Web (Aruba)
- **`web-site-out`**: Scarica questo pacchetto, scompattalo e carica tutto il suo contenuto tramite FTP su **Aruba**. Include già il file `.htaccess` per far funzionare i link correttamente su Linux.

## 🛠 Note Tecniche per la Produzione
- **Versione Android:** Per cambiare la versione dell'app, modifica `versionCode` e `versionName` in `android/app/build.gradle`.
- **Firma (Keystore):** Per pubblicare su Google Play, devi firmare l'app. Genera un keystore e caricalo nei "Secrets" di GitHub se vuoi automatizzare la firma.
- **Supporto TV:** L'app è configurata per essere navigabile con telecomando su Fire TV.

---
&copy; Radio RCS Sicilia di Vancheri Salvatore
