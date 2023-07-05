package com.example.online_blood_donation_mobile_application.activities

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.online_blood_donation_mobile_application.R
import com.example.online_blood_donation_mobile_application.adapter.DonorAdapter
import com.example.online_blood_donation_mobile_application.models.DonatorModel
import com.google.firebase.database.*

class Donarfeaching : AppCompatActivity() {

    private lateinit var donorRecyclerView: RecyclerView
    private lateinit var tvLoadingData: TextView
    private lateinit var donorList: ArrayList<DonatorModel>
    private lateinit var dbRef: DatabaseReference


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_donarfeaching)

        val backD = findViewById<ImageView>(R.id.imageView9)

        backD.setOnClickListener {
            val intent = Intent(this, Dashboard::class.java)
            startActivity(intent)
        }
        donorRecyclerView = findViewById(R.id.rvDonar)
        donorRecyclerView.layoutManager = LinearLayoutManager(this)
        donorRecyclerView.setHasFixedSize(true)
        tvLoadingData = findViewById(R.id.tvLoadingData)

        donorList = arrayListOf<DonatorModel>()

        getEmployeesData()
    }

    private fun getEmployeesData() {

        donorRecyclerView.visibility = View.GONE
        tvLoadingData.visibility = View.VISIBLE

        dbRef = FirebaseDatabase.getInstance().getReference("Donator")

        dbRef.addValueEventListener(object : ValueEventListener {
            override fun onDataChange(snapshot: DataSnapshot) {
                donorList.clear()
                if (snapshot.exists()){
                    for (empSnap in snapshot.children){
                        val donorData = empSnap.getValue(DonatorModel::class.java)
                        donorList.add(donorData!!)
                    }
                    val mAdapter = DonorAdapter(donorList)
                    donorRecyclerView.adapter = mAdapter

                    mAdapter.setOnItemClickListener(object : DonorAdapter.onItemClickListener{
                        override fun onItemClick(position: Int) {

                            val intent = Intent(this@Donarfeaching, DonarDetails::class.java)

                            //put extras
                            intent.putExtra("donatorId", donorList[position].donatorId)
                            intent.putExtra("name", donorList[position].name)
                            intent.putExtra("group", donorList[position].group)
                            intent.putExtra("address", donorList[position].address)
                            intent.putExtra("number", donorList[position].number)
                            startActivity(intent)
                        }

                    })

                    donorRecyclerView.visibility = View.VISIBLE
                    tvLoadingData.visibility = View.GONE
                }
            }

            override fun onCancelled(error: DatabaseError) {
                TODO("Not yet implemented")
            }

        })
    }
}