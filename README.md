# Radio RCS Sicilia - App Ufficiale

Progetto dell'app ufficiale di Radio RCS Sicilia. L'APK/AAB e i file per il sito web vengono generati automaticamente ogni volta che vengono salvate modifiche su GitHub.

## 🚀 Come scaricare i pacchetti pronti
Ogni volta che salvi (push) su GitHub, il sistema genera i file pronti all'uso:
1. Vai nella scheda **"Actions"** in alto su GitHub.
2. Clicca sull'ultimo processo completato con successo (quello con la spunta verde ✅).
3. In fondo alla pagina, nella sezione "Artifacts", scarica il file: **`Radio-RCS-Sicilia-FULL-RELEASE`**.

## 📁 Struttura del Pacchetto (Dopo l'estrazione dello ZIP)
Una volta scompattato il file scaricato, troverai tre cartelle principali:

### 📱 1. Cartella `android/`
Contiene i file per i dispositivi Android:
- `app-debug.aab`: Da caricare su **Google Play Console**.
- `app-debug.apk`: Da caricare su **Amazon Developer Console** o installare manualmente.

### 🌐 2. Cartella `web/ROOT-dominio-principale/`
**Usa questa se vuoi caricare il sito in `www.rcsradio.it/`**
- Copia tutto il contenuto via FTP nella radice del tuo spazio web su Aruba.
- Include già il file `.htaccess` per gestire correttamente il tasto "Aggiorna" del browser.

### 🌐 3. Cartella `web/SUBFOLDER-rcs/`
**Usa questa se vuoi caricare il sito in `www.rcsradio.it/rcs/`**
- Crea la cartella `rcs` sul tuo server Aruba (se non esiste).
- Copia tutto il contenuto qui dentro via FTP.
- Questa versione è configurata appositamente per funzionare all'interno di questo percorso.

---
&copy; Radio RCS Sicilia - La Radio del Cuore della Sicilia
