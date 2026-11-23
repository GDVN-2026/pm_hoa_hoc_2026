<!-- GDVN application documentation | Author: Nguyễn Thanh Vy -->
# Cách mở

**Cách nhanh nhất:** bấm đúp `dist/gdvn.html` (một file duy nhất, không cần mạng, không cần cài gì).

Vì sao `index.html` gốc không mở được khi bấm đúp: trình duyệt chặn `<script type="module">`
nạp file cục bộ (`file://`). Phải chạy qua máy chủ (`node server.cjs`) hoặc dùng bản gộp.

## Chạy từ source
    node server.cjs          # mở http://127.0.0.1:8771/

## Build lại bản gộp sau khi sửa source
    npm install
    npm run build            # -> dist/gdvn.html
    npm test
