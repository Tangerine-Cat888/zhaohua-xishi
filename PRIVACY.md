# Privacy

The plugin does not send telemetry, journal content or reflections to a server.
Settings, draft reflections and review history are stored in the vault's plugin data.json.
Saving a reflection appends it to the configured daily note. The original journal is not modified.
Obsidian's native Markdown renderer may load remote images or embedded resources already present in your notes.
Vault sync and backup tools may copy plugin data along with the vault.

Offline licensing stores a non-extractable signing credential and the device license in local application IndexedDB, outside normal vault sync.
A device request code is a SHA-256 fingerprint of the installation's public key; it contains no diary content, hardware serial number, account name or file path.
The user explicitly sends that code to the seller. The seller retains the order reference and issuance record locally.
No license or telemetry requests are sent by the plugin. Clipboard writes occur only when the user clicks a copy button, such as copying the request code or author contact.
Reinstalling or clearing app storage may invalidate activation; copying the full application environment may defeat software-only device binding.

Image export: only after the user clicks Download, the plugin requests a versioned static resource ZIP from GitHub Releases (including its download CDN). GitHub receives normal request metadata such as the IP address. No notes, license codes, or device request codes are sent. The package contains fonts, images, and credits, not executable code; SHA-256 checks verify the archive and each resource before installation. Files are cached in the vault plugin export-studio directory for offline use. Custom photos and fonts stay in export-photos and export-fonts.

The optional trial (72 hours when started during the early-bird period, 24 hours afterward) starts only when requested and stores its timestamps in local application IndexedDB. Export layout preferences are stored in plugin data.json; the plugin does not keep a second saved copy of the exported note text. Exported files stay in the chosen vault folder.

WeChat article layout runs locally. It reads the selected note or text and referenced local images. Temporary article edits and selected-text colors are discarded when the window closes; layout preferences, templates, palettes, and explicitly saved endings are stored in plugin data.json. Copy writes article HTML and plain text to the clipboard only on request; the plugin does not read the clipboard. Export saves HTML with embedded local images to the vault attachment location. Remote images keep their URLs and may be requested by the renderer or receiving editor. The plugin does not log in to WeChat, upload articles, or publish them.
