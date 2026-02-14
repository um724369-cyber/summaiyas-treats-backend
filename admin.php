<?php include 'db.php'; ?>
<!DOCTYPE html>
<html>
<head>
    <title>Admin - Add New Sweet</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">
    <div class="container py-5">
        <h2 class="mb-4">Add New Item to Mansuri Sweets</h2>
        <form action="insert.php" method="POST" class="card p-4 shadow-sm">
            <div class="mb-3">
                <label class="form-label">Sweet Name</label>
                <input type="text" name="name" class="form-control" required>
            </div>
            <div class="mb-3">
                <label class="form-label">Description</label>
                <textarea name="description" class="form-control"></textarea>
            </div>
            <div class="mb-3">
                <label class="form-label">Price (per kg)</label>
                <input type="number" name="price" class="form-control" required>
            </div>
            <button type="submit" name="submit" class="btn btn-primary">Add to Menu</button>
            <a href="index.php" class="btn btn-link">View Website</a>
        </form>
    </div>
</body>
</html>