# Radio RCS Sicilia - La Voce del Cuore della Sicilia

Benvenuto nel repository ufficiale dell'app e del sito web di Radio RCS Sicilia. Questo progetto è configurato per generare automaticamente i pacchetti pronti per la pubblicazione ogni volta che vengono salvate modifiche su GitHub.

## 🚀 Come scaricare i pacchetti pronti (Produzione)
Ogni volta che fai un "Push" o salvi una modifica:
1. Vai nella scheda **"Actions"** in alto su GitHub.
2. Clicca sull'ultimo processo completato con successo (contrassegnato da una spunta verde ✅).
3. In fondo alla pagina, nella sezione **"Artifacts"**, scarica il file: **`Radio-RCS-Sicilia-PRODUZIONE`**.

## 📁 Struttura del Pacchetto ZIP
Una volta estratto lo ZIP, troverai tre cartelle organizzate:

### 📱 1. Cartella `android/`
Contiene i file per i dispositivi Android e Fire TV:
- `Radio-RCS-Sicilia.aab`: Da caricare su **Google Play Console**. È il formato "Bundle" richiesto da Google.
- `Radio-RCS-Sicilia.apk`: Ideale per l'installazione manuale e per il caricamento su **Amazon Appstore (Fire TV)**.

> **Nota sulla Firma Digitale:** I file generati qui sono in modalità "Debug". Per la pubblicazione ufficiale, Google Play Console firmerà automaticamente il tuo `.aab` se hai attivato "Play App Signing". Per Amazon Fire TV, dovrai firmare l'APK usando il comando `apksigner` o caricarlo sulla console Amazon che gestisce la firma per te.

### 🌐 2. Cartella `web-principale/`
**Usa questa se vuoi caricare il sito in `www.rcsradio.it/`**
- Copia tutto il contenuto via FTP nella cartella principale (root) del tuo spazio Aruba.
- Include il file `.htaccess` ottimizzato per Aruba.

### 🌐 3. Cartella `web-sottocartella-rcs/`
**Usa questa se vuoi caricare il sito in `www.rcsradio.it/rcs/`**
- Copia tutto il contenuto nella sottocartella `rcs` del tuo server Aruba.
- Questa versione è configurata appositamente per funzionare all'interno di quel percorso.

---

## 📺 Note per Amazon Fire TV
L'app è pienamente compatibile con Fire TV. Quando carichi l'APK sulla console Amazon Developer:
1. Assicurati di caricare le immagini richieste nel file `docs/store-listing.md`.
2. La Fire TV richiede un "App Banner" di 1280x720px per essere visualizzata correttamente nella Home.

---
&copy; Radio RCS Sicilia - I Grandi Successi
