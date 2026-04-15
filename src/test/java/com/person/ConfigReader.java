package com.person;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class ConfigReader {

    private static final Properties properties = new Properties();

    // Загружаем properties при старте
    static {
        try {
            InputStream input = ConfigReader.class
                    .getClassLoader()
                    .getResourceAsStream("application.properties");

            if (input == null) {
                throw new RuntimeException("Файл application.properties не найден!");
            }

            properties.load(input);

        } catch (IOException e) {
            throw new RuntimeException("Ошибка чтения application.properties", e);
        }
    }

    // Получить значение по ключу
    public static String get(String key) {
        String value = properties.getProperty(key);
        if (value == null) {
            throw new RuntimeException("Ключ '" + key + "' не найден в application.properties");
        }
        return value;
    }

    // Получить число
    public static int getInt(String key) {
        return Integer.parseInt(get(key));
    }
}
