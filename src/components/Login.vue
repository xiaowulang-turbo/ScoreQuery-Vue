<template>
    <div class="login">
        <div class="login__container">
            <div class="login__container__title">
                <h1>Sign in</h1>
            </div>
            <div class="login__container__form">
                <form @submit.prevent="login">
                    <div class="login__container__form__input">
                        <input
                            type="text"
                            placeholder="Username"
                            v-model="username"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            v-model="password"
                        />
                    </div>
                    <div class="login__container__form__button">
                        <button type="submit">Login</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
