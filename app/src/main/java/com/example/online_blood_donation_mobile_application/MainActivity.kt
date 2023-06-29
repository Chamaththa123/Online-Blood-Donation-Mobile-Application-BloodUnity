package com.example.online_blood_donation_mobile_application

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val start = findViewById<Button>(R.id.start);

        start.setOnClickListener {
            val intent = Intent(this, Home::class.java)
            startActivity(intent)
        }
    }
}