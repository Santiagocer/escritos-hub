# Configurar Git y GitHub

## 1) Inicializar el repositorio local
```bash
cd "c:\Users\Santiago\Documents\Programacion\HTML, CSS, JS\Poemas hub\v1.0"
git init
```

## 2) Verificar la configuración de usuario
```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"
```

## 3) Conectar con un repositorio remoto en GitHub
- Si ya tienes un repositorio remoto en GitHub, copia su URL.
- HTTPS:
```bash
git remote add origin https://github.com/USUARIO/NOMBRE-REPO.git
```
- SSH:
```bash
git remote add origin git@github.com:USUARIO/NOMBRE-REPO.git
```

## 4) Agregar archivos al área de staging
```bash
git add .
git status
```

## 5) Crear un commit
```bash
git commit -m "Mensaje descriptivo del cambio"
```

## 6) Enviar los cambios a GitHub
```bash
git branch -M main
git push -u origin main
```

## 7) Actualizar el repositorio local con cambios remotos
```bash
git pull origin main
```

## 8) Flujo común de trabajo
```bash
git add archivo1 archivo2
git commit -m "Descripción breve"
git push origin main
```

## 9) Manejar ramas
```bash
git checkout -b nombre-rama
git push -u origin nombre-rama
git checkout main
git merge nombre-rama
git push origin main
```

## 10) Ver historial y estado
```bash
git status
git log --oneline --graph --all
```

## Consejos útiles
- Usa un mensaje de commit claro y en presente, por ejemplo: "Agregar página de poemas".
- Si usas HTTPS, puede pedir usuario y contraseña o token personal.
- Si usas SSH, asegúrate de tener la clave SSH configurada en GitHub.
- Si tu repositorio remoto ya existe y tiene commits, ejecuta primero:
```bash
git pull origin main --rebase
```

## Atajos rápidos
- `git add -A` — agrega todos los cambios
- `git commit -am "mensaje"` — agrega y commitea cambios en archivos ya rastreados
- `git push` — envía cambios si ya existe una rama upstream
