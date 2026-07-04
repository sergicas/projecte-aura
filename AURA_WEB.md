# AURA WEB

Interfície gràfica simplificada del Projecte Aura.

## Objectiu

Aquest document fixa l'estat actual de la Fase 5 del Protocol Mestre: Aura ha de tenir una interfície web clara i usable, però no ha de sobrecarregar Sergi amb panells i botons que encara no necessita.

## Versió

```yaml
versio: cloud-v5.2
fase_protocol: 5
format_api: aura-web-interface-v1
endpoint: /api/web
ordre_web: /web
estat_desplegament: local pendent de desplegament
mode_visible: simplificat
```

Des del 2026-07-04, Aura Web manté una pantalla simple però amplia les opcions visibles a vuit accions essencials de lectura, orientació, memòria i una única escriptura controlada:

- `Què és Aura?`
- `Què faig ara?`
- `Estat d'Aura`
- `Identitat`
- `Informe del dia`
- `Grava record`
- `Veure records`
- `Últim record`

Les ordres avançades, endpoints, backups, D1, KV, genoma, diari, coneixement, integritat i Mode Sergi continuen existint. Els botons nous són de lectura/orientació i no afegeixen cap escriptura persistent. Si en el futur Sergi necessita més controls, s'afegiran explícitament.

## Contracte Visible

| Botó | Funció | Ordre interna |
| --- | --- | --- |
| `Què és Aura?` | Explica en local què és Aura i què pot fer aquesta pantalla. | lectura local |
| `Què faig ara?` | Dona una orientació pràctica i breu per continuar. | lectura local |
| `Estat d'Aura` | Mostra recompte local de records, diari, gens i coneixement. | lectura local |
| `Identitat` | Mostra nom, versió, funció i límits d'Aura. | lectura local |
| `Informe del dia` | Mostra estat, recomptes, integritat i últim record. | `/informe-dia` |
| `Grava record` | Demana el text del record i l'escriu a D1 amb Mode Sergi. | `recorda que ...` |
| `Veure records` | Mostra els records recents. | `/memoria` |
| `Últim record` | Mostra l'últim record guardat i com comprovar-lo. | `/ultim-record` |

El camp de text continua disponible per escriure ordres manualment, però no afegeix cap botó extra. `Grava record` demana la clau Mode Sergi només si el navegador encara no la té validada.

## Fonts de Veritat

- D1: records, diari, genoma, catàleg de coneixement i meta.
- KV: backups, snapshots d'integritat i metadata del Worker.
- IndexedDB: còpia local i fallback.
- Documents mestres: reconstrucció del protocol.

## Salvaguardes

- Cap escriptura persistent sense Mode Sergi.
- Les accions `Què és Aura?`, `Què faig ara?`, `Estat d'Aura`, `Identitat`, `Informe del dia`, `Veure records` i `Últim record` són de lectura.
- `Grava record` és l'única acció visible que pot escriure i només activa Mode Sergi quan cal.
- L'ampliació de la web no elimina dades ni endpoints.
- La interfície no substitueix el protocol ni els documents mestres.
- Després de canvis d'interfície, cal fer backup i snapshot d'integritat.
