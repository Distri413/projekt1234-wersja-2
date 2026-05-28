<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Panel sterujący</title>
    
     @vite(['resources/css/app.css', 'resources/js/app.js'])

</head>

<body>

    <header>

        <img src="{{ Vite::asset('resources/images/pulpetcorp.png') }}" alt="logo">

    </header>

    <main>
        <div style="width: 100%; display: flex; flex-direction: column; align-items: center;">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Imię</th>
                        <th>Nazwisko</th>
                        <th>Email</th>
                        <th>Edytuj użytkownika</th>
                        <th>Usuń użytkownika</th>
                    </tr>
                </thead>
                <tbody id="usersTable">
                </tbody>
            </table>
            <div id="pagination-container" style="display: flex; justify-content: center; gap: 8px; margin-top: 20px;">
            </div>
        </div>
    </main>

    <aside>

        <form onsubmit="addUser(event)">

            <h2>Dodaj użytkownika</h2>

            <label for="name">Imię</label>
            <input id="name" placeholder="Imię" type="text" required>

            <label for="surname">Nazwisko</label>
            <input id="surname" placeholder="Nazwisko" type="text" required>

            <label for="email">Email</label>
            <input id="email" placeholder="Email" type="text" required>

            <label for="password">Hasło</label>
            <input id="password" placeholder="Hasło" type="password" required>

            <button type="submit">Dodaj</button>
        </form>

    </aside>

</body>

</html>
